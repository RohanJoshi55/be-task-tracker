const express = require("express");
const router = express.Router();

const { getUsers, deleteUser, updateProfile } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", protect, authorize("admin", "manager"), getUsers);
router.patch("/profile", protect, updateProfile);
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;