const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/tasks");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/tasks", tasksRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
