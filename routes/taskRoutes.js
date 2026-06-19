const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { createTask, getTasks, getTaskById } = require("../controllers/taskController");

router.post("/",protect,authorize("admin", "manager"),createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);

module.exports = router;