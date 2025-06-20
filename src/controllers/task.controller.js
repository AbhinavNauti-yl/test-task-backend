import { Task } from "../Models/task.model.js";

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, due, belongTo } =
      req?.body;

    const task = new Task({
      title,
      description,
      status,
      priority,
      assignedTo,
      due,
      belongTo,
    });
    const response = await task.save();
    if (!response) {
      return res.status(500).json({
        message: "could not create task",
      });
    }

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let filter = req?.query?.search;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    const tasks = await Task.find(where);
    if (!tasks) {
      return res.status(500).json({
        message: "could not find tasks",
      });
    }
    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getParticulaeTasks = async (req, res) => {
  try {
    const taskId = (req?.params?.taskId).replace(":", "");
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(500).json({
        message: "could not find tasks",
      });
    }
    res.status(200).json({
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateParticularTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, due, belongTo } =
      req?.body;

    const taskId = (req?.params?.taskId).replace(":", "");
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        status,
        priority,
        assignedTo,
        due,
        belongTo,
      },
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(500).json({
        message: "could not update task",
      });
    }

    res.status(200).json({
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getBoardTask = async (req, res) => {
  try {
    const boardId = (req?.params?.id).replace(":", "");
    const tasks = await Task.find({ belongTo: boardId });
    if (!tasks) {
      return res.status(500).json({
        message: "could not find tasks",
      });
    }
    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params?.id;
    const response = await Task.findByIdAndDelete(id);
    if (!response) {
      return res.status(500).json({
        message: "could not delete task",
      });
    }
    res.status(200).json({
      message: "deleted task",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "could not delete",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params?.id;

    const updateFields = {};
    if (req.body.title !== undefined) updateFields.title = req.body.title;
    if (req.body.description !== undefined)
      updateFields.description = req.body.description;
    if (req.body.status !== undefined) updateFields.status = req.body.status;
    if (req.body.priority !== undefined)
      updateFields.priority = req.body.priority;
    if (req.body.assignedTo !== undefined)
      updateFields.assignedTo = req.body.assignedTo;
    if (req.body.due !== undefined) updateFields.due = req.body.due;
    if (req.body.belongTo !== undefined)
      updateFields.belongTo = req.body.belongTo;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
    if (!updateTask) {
      return res.status(500).json({
        message: "could not update task",
      });
    }
    res.status(200).json({
      data: updatedTask,
      message: "task updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "could not update",
    });
  }
};

export {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  getBoardTask,
  getParticulaeTasks,
  updateParticularTask
};
