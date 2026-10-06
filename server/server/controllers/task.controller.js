import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  if (!title) {
    return res.status(400).json({
      message: "title is required",
    });
  }
  try {
    const task = await Task.create({
      title,
      description: description || "",
      owner: userId,
    });

    if (!task) {
      return res.status(500).json({
        message: "task not created",
      });
    }
    return res.status(201).json({
      message: "your task added successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "task not created",
      error,
    });
  }
};

export const getAlltaskbyOwner = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await Task.find({ owner: userId });
    if (tasks.length <= 0) {
      return res.status(404).json({
        message: "tasks not found",
      });
    }

    return res.status(200).json({
      message: "tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "task not deleted",
      error,
    });
  }
};
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.json({
        message: "task not deleted",
      });
    }
    return res.json({
      message: "task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "task not deleted",
      error,
    });
  }
};
