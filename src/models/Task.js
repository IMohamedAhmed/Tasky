const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "archived"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Task", TaskSchema, "Tasks");
