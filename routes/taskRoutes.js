const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { createTask, getTasks, getTaskById, updateTask } = require("../controllers/taskController");

router.post("/",protect,authorize("admin", "manager"),createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.patch("/:id", protect, authorize("admin", "manager"), updateTask);

module.exports = router;