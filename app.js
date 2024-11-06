import express from "express";
import { connectDB } from "./src/config/db.js";
import { authRouter } from "./src/routes/auth.route.js";
import { taskRouter } from "./src/routes/task.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

connectDB();
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running at port ${port}`));

// AUTH ENDPOINTS:
// POST /register
// POST /login

// TASKS ENDPOINTS:
// POST /tasks
// GET /tasks
// GET /tasks/:id
// PATCH /tasks/:id
// DELETE /tasks/:id

// GET /tasks/all
