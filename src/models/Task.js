const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: true
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
      required: true
    },
    _project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    videoLink: {
      type: String,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("Task", TaskSchema, "Tasks");
