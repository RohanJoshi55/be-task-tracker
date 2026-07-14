const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateRequest");

const {
  createTaskValidator,
  updateTaskValidator,
  statusValidator,
  commentValidator,
} = require("../middleware/validators/taskValidators");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
  addTaskComment,
} = require("../controllers/taskController");

router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createTaskValidator,
  validateRequest,
  createTask
);

router.get("/", protect, getTasks);

router.get("/stats", protect, getTaskStats);

router.post(
  "/:id/comments",
  protect,
  commentValidator,
  validateRequest,
  addTaskComment
);

router.patch(
  "/:id/status",
  protect,
  statusValidator,
  validateRequest,
  updateTaskStatus
);

router.get("/:id", protect, getTaskById);

router.patch(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateTaskValidator,
  validateRequest,
  updateTask
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "manager"),
  deleteTask
);

module.exports = router;