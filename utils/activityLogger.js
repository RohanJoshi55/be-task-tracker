const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({ user, action, targetType, targetId, details }) => {
  try {
    await ActivityLog.create({
      user,
      action,
      targetType,
      targetId,
      details,
    });
  } catch (error) {
    console.error("Activity log failed:", error.message);
  }
};

module.exports = logActivity;