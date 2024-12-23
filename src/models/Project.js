const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
    _tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Project", ProjectSchema, "Projects");
