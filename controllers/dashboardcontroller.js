const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const pendingTasks = await Task.countDocuments({
      status: "pending",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "in-progress",
    });

    const completedTasks = await Task.countDocuments({
      status: "completed",
    });

    res.status(200).json({
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};