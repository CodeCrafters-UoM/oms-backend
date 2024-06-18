const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const auth = require("../middlewares/auth");
const { Role } = require("@prisma/client");

// Route to get notifications for a user
router.get(
  "/notifications",
  auth.protected.check([Role.SELLER, Role.ADMIN, Role.BUYER]),
  notificationController.getNotifications
);

// Route to create a new notification (if needed, otherwise notifications might be created internally)
router.post(
  "/notifications",
  auth.protected.check([Role.SELLER, Role.ADMIN, Role.BUYER]),
  notificationController.createNotification
);

// Optionally, a route to mark notifications as read
router.put(
  "/notifications/:id/read",
  auth.protected.check([Role.SELLER, Role.ADMIN, Role.BUYER]),
  notificationController.markAsRead
);

// Optionally, a route to delete a notification
router.delete(
  "/notifications/:id",
  auth.protected.check([Role.SELLER, Role.ADMIN, Role.BUYER]),
  notificationController.deleteNotification
);

module.exports = router;
