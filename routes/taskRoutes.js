const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
  addTaskComment,
} = require("../controllers/taskController");

const validateRequest = require("../middleware/validateRequest");

const {
  createTaskValidator,
  updateTaskValidator,
  commentValidator,
} = require("../middleware/validators/taskValidators");

// Create Task
router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createTaskValidator,
  validateRequest,
  createTask
);

// Get All Tasks
router.get("/", protect, getTasks);

// Task Statistics
router.get("/stats", protect, getTaskStats);

// Add Comment
router.post(
  "/:id/comments",
  protect,
  commentValidator,
  validateRequest,
  addTaskComment
);

// Get Single Task
router.get("/:id", protect, getTaskById);

// Update Task
router.patch(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateTaskValidator,
  validateRequest,
  updateTask
);

// Delete Task
router.delete(
  "/:id",
  protect,
  authorize("admin", "manager"),
  deleteTask
);

module.exports = router;