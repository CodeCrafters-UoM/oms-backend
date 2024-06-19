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

const markAllNotificationsAsRead = async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await notificationService.markAllNotificationsAsRead(userId);
    res.status(200).json(notifications); 
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  markAllNotificationsAsRead,
};
