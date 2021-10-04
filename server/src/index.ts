import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
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
const teams: { [key: string]: { house: string; score: number } } = {};

//#endregion

// Called when first connects
io.on("connection", socket => {
  console.log(socket.id + " connected");
  // Send over all of the questions
  socket.emit("questions", questions);

  // TODO: Make the team selectable and not hardcoded
  teams[socket.id] = { house: "Graham", score: 0 };

  socket.on("answer", answerIndex => {
    const currentQuestion = questions[questionGroupIndex].questions[questionIndex];
    console.log(`${socket.id} answered ${answerIndex}`);
    // Maybe move this logic to where admin controls
    if (currentQuestion.isMultiChoice) {
      if (answerIndex === currentQuestion.correctIndex) {
        teams[socket.id].score += 1;
        console.log(
          `${teams[socket.id].house} was correct and their score is now ${teams[socket.id].score}`
        );
      } else {
        console.log(`${socket.id} was incorrect`);
      }
    }
  });

  socket.on("admin_login", password => {
    // TODO: Change password to be more secure
    if (password === "joe") {
      console.log(`${socket.id} logged in as admin`);
      socket.emit("admin_teams", teams);
    }
  });
});

http.listen(port, host, () => console.log(`listening on http://${host}:${port}`));
