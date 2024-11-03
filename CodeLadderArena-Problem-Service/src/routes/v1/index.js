const express = require("express");
const problemRouter = require("./problems.routes");
const authRouter = require("./auth.routes");
const submissionDetailsRouter = require("./submissionDetails.routes");


const v1Router = express.Router();

v1Router.use("/problems", problemRouter);   // /problems/:id , /problems/ , ...
v1Router.use("/auth", authRouter);
v1Router.use("/submissionDetails", submissionDetailsRouter)

module.exports = v1Router ;