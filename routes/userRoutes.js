const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", protect, authorize("admin", "manager"), getUsers);

module.exports = router;