const { body } = require("express-validator");

const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description").optional().trim(),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),

  body("dueDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("assignedTo")
    .notEmpty()
    .withMessage("Assigned user is required")
    .isMongoId()
    .withMessage("Assigned user must be a valid user ID"),
];

const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description").optional().trim(),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),

  body("dueDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Assigned user must be a valid user ID"),
];

const statusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),
];

const commentValidator = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Comment text is required")
    .isLength({ min: 2 })
    .withMessage("Comment must be at least 2 characters long"),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
  statusValidator,
  commentValidator,
};