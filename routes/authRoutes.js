const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/roleMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    message: "Admin access granted",
    user: req.user,
  });
});

module.exports = router;