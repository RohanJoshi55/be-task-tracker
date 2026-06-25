const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "manager") {
      filter.createdBy = req.user._id;
    }

    if (req.user.role === "employee") {
      filter.assignedTo = req.user._id;
    }
 
    if (req.query.status) {
    filter.status = req.query.status;
    }

    if (req.query.priority) {
    filter.priority = req.query.priority;
    }

    let sortOption = { createdAt: -1 };

if (req.query.sort === "dueDate") {
  sortOption = { dueDate: 1 };
}

if (req.query.sort === "priority") {
  sortOption = { priority: 1 };
}

if (req.query.sort === "oldest") {
  sortOption = { createdAt: 1 };
}

const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 5;
const skip = (page - 1) * limit;

const totalTasks = await Task.countDocuments(filter);

const tasks = await Task.find(filter)
  .sort(sortOption)
  .skip(skip)
  .limit(limit)
  .populate("assignedTo", "name email role")
  .populate("createdBy", "name email role");

    res.status(200).json({
  totalTasks,
  page,
  limit,
  totalPages: Math.ceil(totalTasks / limit),
  tasks,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTaskStats = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "manager") {
      filter.createdBy = req.user._id;
    }

    if (req.user.role === "employee") {
      filter.assignedTo = req.user._id;
    }

    const totalTasks = await Task.countDocuments(filter);
    const pendingTasks = await Task.countDocuments({ ...filter, status: "pending" });
    const inProgressTasks = await Task.countDocuments({ ...filter, status: "in-progress" });
    const completedTasks = await Task.countDocuments({ ...filter, status: "completed" });

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

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
};
