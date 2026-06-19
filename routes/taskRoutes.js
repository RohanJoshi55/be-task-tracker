const express = require("express");
const router = express.Router();

const { createTask } = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createTask
);

module.exports = router;