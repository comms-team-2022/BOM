import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import { TeamCorrect, Teams } from "../../types";
import questions from "./questions.json";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const http = createServer();
const io = new Server(http, { cors: { origin: corsOrigin } });

// Make sure this is the same as the one in constants.ts in client
const enum Page {
    START,
    GRADE,
    QUESTION,
    CHART,
    END,
}

const PASSWORD = process.env.PASSWORD ?? "joe";

// Default grade
let questionGroupIndex = 0;
// Default question in grade
let questionIndex = 0;
// House information
const teams: Teams = {
    graham: { score: 0, house: "graham" },
    wesley: { score: 0, house: "wesley" },
    elliot: { score: 0, house: "elliot" },
    booth: { score: 0, house: "booth" },
};
let page = Page.START;
let time: number | null = null;

function decreaseTime() {
    io.sockets.emit("update_time", time);
    if (time !== null && time !== 0) {
        time--;
        setTimeout(decreaseTime, 1000);
    }
}

// Called when first connects
io.on("connection", socket => {
    console.log(socket.id + " connected");
    // Send over all of the questions
    socket.emit("questions", questions);
    socket.emit("question_index", questionIndex);
    socket.emit("question_group_index", questionGroupIndex);
    // Send over team information
    socket.emit("teams", teams);
    socket.emit("page", page);
    socket.emit("update_time", time);

    socket.on("answer", (answer: number | string, house: keyof Teams) => {
        teams[house].chosenAnswer = answer;
        io.sockets.emit("teams", teams);
        console.log(`${house} answered ${answer}`);
    });

    socket.on("admin_login", password => {
        if (password !== PASSWORD) return;

        console.log(`${socket.id} logged in as admin`);
        socket.emit("admin_login_success");

        socket.on("admin_finish_question", (teamCorrect: TeamCorrect) => {
            const currentQuestion = questions[questionGroupIndex].questions[questionIndex];
            for (const house in teams) {
                let correct: boolean;

                if (currentQuestion.isMultiChoice) {
                    correct =
                        teams[house as keyof Teams].chosenAnswer === currentQuestion.correctIndex;
                } else {
                    correct = teamCorrect[house as keyof Teams]!;
                }

                if (correct) {
                    teams[house as keyof Teams].score += 1;
                    teams[house as keyof Teams].isCorrect = true;
                    console.log(
                        `${house} was correct and their score is now ${
                            teams[house as keyof Teams].score
                        }`
                    );
                } else {
                    teams[house as keyof Teams].isCorrect = false;
                    console.log(`${house} was incorrect`);
                }
            }

            time = null;
            io.sockets.emit("update_time", time);
            io.sockets.emit("teams", teams);
        });

        socket.on("admin_next_question", () => {
            questionIndex++;
            if (questionIndex === questions[questionGroupIndex].questions.length) {
                questionIndex = 0;
                questionGroupIndex++;
                page = Page.GRADE;
                io.sockets.emit("page", page);
            }

            for (const house in teams) {
                teams[house as keyof Teams].isCorrect = undefined;
                teams[house as keyof Teams].chosenAnswer = undefined;
            }

            io.sockets.emit("question_index", questionIndex);
            io.sockets.emit("question_group_index", questionGroupIndex);
            io.sockets.emit("teams", teams);

            const question_time = questions[questionGroupIndex].questions[questionIndex].time;
            if (question_time) {
                time = question_time;
                decreaseTime();
            }
        });

        socket.on("admin_change_page", (new_page: Page) => {
            page = new_page;
            io.sockets.emit("page", page);
        });
    });
});

http.listen(port, host, () => console.log(`listening on http://${host}:${port}`));
