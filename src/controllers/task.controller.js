import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json({ message: "task created", newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getAllUserTasks = async (req, res) => {
  try {
    const userTasks = await Task.find({ createdBy: req.user.id }).populate(
      "createdBy"
    );
    res.status(200).json({ message: "retrieved", userTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getUserTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId, userRole } = req.user;

    // another approach to -- const task = await Task.findById(taskId);
    const task = await Task.findOne({
      _id: taskId,
      createdBy: userId,
    }).populate("createdBy");

    if (!task) {
      return res.status(404).json({ message: `no task with id ${taskId}` });
    }

    // if (task.createdBy.toString() === userId || userRole === "admin") {
    return res.status(200).json({ task });
    // } else {
    //   res.status(403).json({ message: `You don't have access to this task` });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ message: "retrieved all tasks", tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return res.status(404).json({ message: `no task with id ${taskId}` });
    }
    res.status(200).json({ message: "update was successful", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      createdBy: userId,
    });
    if (!task) {
      return res.status(404).json({ message: `no task with id ${taskId}` });
    }
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
