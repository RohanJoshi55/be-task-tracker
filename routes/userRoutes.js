const express = require("express");
const router = express.Router();

const { getUsers, deleteUser, updateProfile, updateUser, changePassword, resetUserPassword } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", protect, authorize("admin", "manager"), getUsers);
router.patch("/profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword);
router.patch("/reset-password/:id", protect, authorize("admin"), resetUserPassword);
router.patch("/:id", protect, authorize("admin"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;