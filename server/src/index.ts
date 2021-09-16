import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const http = createServer();
const io = new Server(http, { cors: { origin: corsOrigin } });

io.on("connection", socket => {
  console.log(socket.id + " connected");

  socket.on("message", message => {
    console.log(`${socket.id} said ${message}`);
  });
});

http.listen(port, host, () => console.log(`listening on http://${host}:${port}`));
