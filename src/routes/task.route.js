import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllUserTasks,
  getUserTask,
  updateTask,
} from "../controllers/task.controller.js";
import { authenticate, IsAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, createTask)
  .get(authenticate, getAllUserTasks);

router.get("/all", authenticate, IsAdmin, getAllTasks);

router
  .route("/:id")
  .get(authenticate, getUserTask)
  .patch(authenticate, updateTask)
  .delete(authenticate, deleteTask);

export { router as taskRouter };
