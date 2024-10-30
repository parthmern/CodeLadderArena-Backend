const express = require("express");
const problemRouter = require("./problems.routes");
const authRouter = require("./auth.routes");


const v1Router = express.Router();

v1Router.use("/problems", problemRouter);   // /problems/:id , /problems/ , ...
v1Router.use("/auth", authRouter);

module.exports = v1Router ;