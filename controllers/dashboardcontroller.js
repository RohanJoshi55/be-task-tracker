const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "manager") {
      filter.createdBy = req.user._id;
    }

    if (req.user.role === "employee") {
      filter.assignedTo = req.user._id;
    }

    const totalTasks = await Task.countDocuments(filter);

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "pending",
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "in-progress",
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
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