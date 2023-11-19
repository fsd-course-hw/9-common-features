import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join-board", (data) => {
    socket.join(data.boardId);
  });

  socket.on("board-updated", (data) => {
    socket.broadcast.to(data.boardId).emit("refresh-board", data);
  });

  socket.on("leave-board", (data) => {
    socket.leave(data.boardId);
  });
});

console.log("start listen on port 3000");
