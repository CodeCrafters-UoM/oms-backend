const { Server } = require("socket.io");

let io;

function initWebSocketServer(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

function sendNotification(message) {
  if (io) {
    io.emit("notification", message);
  } else {
    console.log("WebSocket server not initialized");
  }
}

module.exports = { initWebSocketServer, sendNotification };
