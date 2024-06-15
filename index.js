const express = require("express");
const app = express();
const dashbaordRouter = require("./routes/routes");
const fileReaderRouter = require("./routes/filereaderRoute");
const morgan = require("morgan");

app.use(morgan("combined"));

app.use("/dashboard", dashbaordRouter);
app.use("/read", fileReaderRouter);


module.exports = app;