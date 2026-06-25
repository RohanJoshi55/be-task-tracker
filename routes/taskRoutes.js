const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { createTask, getTasks, getTaskById, updateTask, deleteTask, getTaskStats } = require("../controllers/taskController");

router.post("/",protect,authorize("admin", "manager"),createTask);
router.get("/", protect, getTasks);
router.get("/stats", protect, getTaskStats);
router.get("/:id", protect, getTaskById);
router.patch("/:id", protect, authorize("admin", "manager"), updateTask);
router.delete("/:id", protect, authorize("admin", "manager"), deleteTask);

module.exports = router;