const express = require("express");
const app = express();
var path = require("path");
var http = require("http");
const socket = require("socket.io");

var index = require("./routes/index");
const { Chess } = require("chess.js");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let player = {};
let currentPlayer = "w";

io.on("connection", (uniquesocket) => {
  console.log("connected with socket server");
  if (!player.white) {
    player.white = uniquesocket.id;
    uniquesocket.emit("playerRole", "w");
  } else if (!player.black) {
    player.black = uniquesocket.id;
    uniquesocket.emit("playerRole", "b");
  } else {
    uniquesocket.emit("SpectatorRole");
  }
  uniquesocket.on("disconnect", () => {
    if (uniquesocket.id === player.white) {
      delete player.white;
    } else if (uniquesocket.id === player.black) {
      delete player.black;
    }
    console.log("user is disconnected");
  });

  uniquesocket.on("move", (move) => {
    try {
      if (chess.turn() === "w" && uniquesocket.id !== player.white) return;
      if (chess.turn() === "b" && uniquesocket.id !== player.black) return;

      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid move:", move);
        uniquesocket.emit("invalidMove", move);
      }
    } catch (err) {
      console.log(err);
      uniquesocket.emit("Invalid move: ", move);
    }
  });
});
server.listen(3000, () => {
  console.log(" server is running");
});
