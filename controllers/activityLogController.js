const ActivityLog = require("../models/ActivityLog");

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Activity logs fetched successfully",
      count: logs.length,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activity logs",
      error: error.message,
    });
  }
};

module.exports = {
  getActivityLogs,
};