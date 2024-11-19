const express = require("express");
require("dotenv").config();
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("To do app");
});

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

// app.get("/api/v1/todos")          - get all the todos
// app.post("/api/v1/todos")         - create a new todo
// app.get("/api/v1/todos/:id")      - get single todo
// app.put("/api/v1/todos/:id")      - update todo
// app.delete("/api/v1/todos/:id")   - delete todo
