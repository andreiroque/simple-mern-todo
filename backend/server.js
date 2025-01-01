const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGOOSE_URI, { directConnection: true })
  .then(() => console.log("Successfully Connected to the Database!"))
  .catch((err) => console.error(err));

const taskSchema = new mongoose.Schema({
  name: String,
  status: String,
});

const taskModel = mongoose.model("tasks", taskSchema);

app.post("/api/newtask", async (req, res) => {
  const { name, status } = req.body;

  const newTask = new taskModel({ name, status });

  try {
    await newTask
      .save()
      .then(() => console.log("Task saved to the database successfully"))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.send(tasks);
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/update/status", async (req, res) => {
  const { id } = req.body;

  try {
    await taskModel
      .updateOne({ _id: id }, { status: "Done" })
      .then(() => console.log("Task successfully updated"))
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }

  console.log(`ObjectId('${id}')`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});
