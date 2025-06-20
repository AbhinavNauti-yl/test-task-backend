import mongoose, { Mongoose } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "To do",
        required: true,
    },
    priority: {
        type: String,
        default: "Medium",
        required: true,
    },
    assignedTo: {
        type: String,
        default: "testUser",
        required: true,
    },
    due: {
        type: String,
    },
    belongTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
