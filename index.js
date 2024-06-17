const express = require("express");
const app = express();
const dashbaordRouter = require("./routes/routes");
const fileReaderRouter = require("./routes/filereaderRoute");
const authRouter = require("./routes/authRouter");
const morgan = require("morgan");

app.use(morgan("combined"));

app.use("/dashboard", dashbaordRouter);
app.use("/read", fileReaderRouter);
app.use("/userAuth", authRouter);


module.exports = app;