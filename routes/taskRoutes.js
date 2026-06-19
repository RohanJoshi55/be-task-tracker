const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { createTask, getTasks } = require("../controllers/taskController");

router.post("/",protect,authorize("admin", "manager"),createTask);
router.get("/", protect, getTasks);

module.exports = router;