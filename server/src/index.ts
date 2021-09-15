import { createServer } from "http";
import { Server } from "socket.io";

const http = createServer();
// ? Maybe the origin should be changed to prevent unwanted addresses connecting
const io = new Server(http, { cors: { origin: "*" } });

io.on("connection", socket => {
  console.log("client connected");

  socket.on("message", message => {
    console.log(`${socket.id} said ${message}`);
  });
});

http.listen(8080, () => console.log("listening on http://localhost:8080"));
