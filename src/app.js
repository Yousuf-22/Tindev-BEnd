const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

// to handle JSON data we need a middleware
// this take a JSON and converted into js object
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

// first DB connnection then server start listening
connectDB()
  .then(() => {
    console.log("Database connection successfully... ");
    app.listen(3000, () => {
      console.log("Server Running on 3000 port");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connnected !!! ");
  });
