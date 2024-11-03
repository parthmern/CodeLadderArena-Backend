const express = require("express");
const { submissionDetailsController } = require("../../controllers");

const submissionDetailsRouter = express.Router();

submissionDetailsRouter.get("/:submissionId", submissionDetailsController.getSubmissionById);
submissionDetailsRouter.get("/user/:userId", submissionDetailsController.getSubmissionsByUserId);
submissionDetailsRouter.get("/user/:userId/problem/:problemId", submissionDetailsController.getSubmissionByUserAndProblem);


module.exports = submissionDetailsRouter;