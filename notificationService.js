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

function sendNotification(order) {
  if (io) {
    const message = `New order for product: ${order.product.name}`;
    io.emit("notification", { message, time: new Date().toLocaleTimeString() });
  } else {
    console.log("WebSocket server not initialized");
  }
}

module.exports = { initWebSocketServer, sendNotification };
