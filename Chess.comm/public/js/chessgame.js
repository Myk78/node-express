// const { Chess } = require("chess.js");
const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderboard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";
  board.forEach(function (row, rowindex) {
    row.forEach((square, squareIndex) => {
      const squareElement = document.createElement("div");
      squareElement.classList.add(
        "square",
        (rowindex + squareIndex) % 2 === 0 ? "light" : "dark"
      );
      squareElement.dataset.row = rowindex;
      squareElement.dataset.col = squareIndex;
      if (square) {
        const peiceElement = document.createElement("div");
        peiceElement.classList.add(
          "piece",
          square.color === "w" ? "white" : "black"
        );
        peiceElement.innerHTML = getPeiceUnicode(square);
        peiceElement.draggable = playerRole === square.color;
        peiceElement.addEventListener("dragstart", (e) => {
          if (peiceElement.draggable) {
            draggedPiece = peiceElement;
            sourceSquare = { row: rowindex, col: squareIndex };
            e.dataTransfer.setData("text/plan", "");
          }
        });
        peiceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });
        squareElement.appendChild(peiceElement);
      }
      squareElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      squareElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSource = {
            row: parseInt(squareElement.dataset.row),
            col: parseInt(squareElement.dataset.col),
          };
          handleMove(sourceSquare, targetSource);
        }
      });
      boardElement.appendChild(squareElement);
    });
  });
  if (playerRole === "b") {
    boardElement.classList.add("flipped");
  } else {
    boardElement.classList.remove("flipped");
  }
};
const handleMove = (source, target) => {
  const move = {
    from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: "q",
  };
  socket.emit("move", move);
};
const getPeiceUnicode = (peice) => {
  if (!peice) return ""; // Ensure that the piece exists

  const unicodePieces = {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚", // Black pieces
    P: "♙",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔", // White pieces
  };

  const pieceKey =
    peice.color === "w" ? peice.type.toUpperCase() : peice.type.toLowerCase();
  return unicodePieces[pieceKey] || ""; // Return the correct Unicode, or empty string if none
};
socket.on("playerRole", (role) => {
  playerRole = role;
  renderboard();
});
socket.on("spectatorRole", () => {
  (playerRole = null), renderboard();
});
socket.on("boardState", (fen) => {
  chess.load(fen);
  renderboard();
});
socket.on("move", (move) => {
  chess.move(move);
  renderboard();
});

console.log("hi");
renderboard();
