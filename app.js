require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const tasksRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).json({ message: err.message });
});

const port = process.env.PORT || 3001;
const db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jxqjrp8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(db_url)
  .then(() => {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
