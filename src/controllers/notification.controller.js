const notificationService = require("../services/notification.service");

const getNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await notificationService.getNotifications(userId);
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

const createNotification = async (req, res) => {
  const { userId, message, orderId } = req.body;
  try {
    const notification = await notificationService.createNotification({ userId, message, orderId });
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Failed to create notification" });
  }
};

const markAsRead = async (req, res) => {
  const notificationId = req.params.id;
  try {
    const notification = await notificationService.markAsRead(notificationId);
    res.json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};

const deleteNotification = async (req, res) => {
  const notificationId = req.params.id;
  try {
    await notificationService.deleteNotification(notificationId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Failed to delete notification" });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
};
