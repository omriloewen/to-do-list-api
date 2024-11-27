const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authentication");

let tasks = [];
let currId = 1;

//handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// get all tasks
router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json(tasks);
  })
);

//add a new task
router.post(
  "/",
  authenticate,
  authenticate,
  asyncHandler(async (req, res) => {
    const task = {
      id: currId,
      title: req.body.title,
      completed: false,
    };
    currId++;
    tasks.push(task);
    res.status(201).json(task);
  })
);

//update a task
router.put(
  "/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = req.body.title !== undefined ? req.body.title : task.title;
      task.completed =
        req.body.completed !== undefined ? req.body.completed : task.completed;
      res.json(task);
    } else {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }
  })
);

//delete a task
router.delete(
  "/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter((t) => t.id !== taskId);
    res.status(204).end();
  })
);

module.exports = router;
