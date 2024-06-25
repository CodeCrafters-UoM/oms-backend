const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let io;

function initWebSocketServer(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://deleever.one"],
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

async function sendNotification(order) {
  if (!io) {
    console.log("WebSocket server not initialized");
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: order.productId,
      },
    });

    if (!product) {
      console.log("Product not found");
      return;
    }
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    const message = `New order received for ${product.name}\n${date} at ${time}`;

    const notification = await prisma.notification.create({
      data: {
        message,
        read: false,
        userId: order.sellerId,
        orderId: order.orderId,
      },
    });

    io.emit("notification", {
      id: notification.id,
      message: notification.message,
      read: notification.read,
      userId: notification.userId,
      orderId: notification.orderId,
      createdAt: notification.createdAt,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

async function getNotifications(userId) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        // read: false,
      },
      orderBy: {
        createdAt: "desc", // Order by most recent notifications first
      },
    });
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

async function markAllNotificationsAsRead(userId) {
  try {
    const notifications = await prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
    return notifications;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
}

module.exports = {
  initWebSocketServer,
  sendNotification,
  getNotifications,
  markAllNotificationsAsRead,
};
