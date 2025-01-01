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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});
