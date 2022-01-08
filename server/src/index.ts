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

//#region State Initialisation

// Default grade
let questionGroupIndex = 0;
// Default question in grade
let questionIndex = 0;
// House information; Keys are ids
const teams: Teams = {};

//#endregion

// Called when first connects
io.on("connection", socket => {
    console.log(socket.id + " connected");
    // Send over all of the questions
    socket.emit("questions", questions);
    // Send over team information
    socket.emit("teams", teams);
    socket.emit("question_index", questionIndex);
    socket.emit("question_group_index", questionGroupIndex);

    // TODO: prevent multiple users using the same house
    socket.on("house_login", house => {
        teams[socket.id] = { house, score: 0 };
        // emit to all sockets
        io.sockets.emit("teams", teams);
    });

    socket.on("answer", answer => {
        teams[socket.id].chosenAnswer = answer;
        io.sockets.emit("teams", teams);
        console.log(`${socket.id} answered ${answer}`);
    });

    socket.on("admin_login", password => {
        // TODO: Change password to be more secure
        if (password !== "joe") return;

        console.log(`${socket.id} logged in as admin`);
        socket.emit("admin_login_success");

        socket.on("admin_finish_question", (teamCorrect: TeamCorrect) => {
            const currentQuestion = questions[questionGroupIndex].questions[questionIndex];
            for (const id in teams) {
                let correct: boolean;

                if (currentQuestion.isMultiChoice) {
                    correct = teams[id].chosenAnswer === currentQuestion.correctIndex;
                } else {
                    correct = teamCorrect[id];
                }

                if (correct) {
                    teams[id].score += 1;
                    teams[id].isCorrect = true;
                    console.log(
                        `${teams[id].house} was correct and their score is now ${teams[id].score}`
                    );
                } else {
                    teams[id].isCorrect = false;
                    console.log(`${teams[id].house} was incorrect`);
                }
            }

            io.sockets.emit("teams", teams);
        });

        socket.on("admin_next_question", () => {
            questionIndex++;
            if (questionIndex === questions[questionGroupIndex].questions.length) {
                questionIndex = 0;
                questionGroupIndex++;
            }

            for (const id in teams) {
                teams[id].isCorrect = undefined;
                teams[id].chosenAnswer = undefined;
            }

            io.sockets.emit("question_index", questionIndex);
            io.sockets.emit("question_group_index", questionGroupIndex);
            io.sockets.emit("teams", teams);
        });
    });
});

http.listen(port, host, () => console.log(`listening on http://${host}:${port}`));
