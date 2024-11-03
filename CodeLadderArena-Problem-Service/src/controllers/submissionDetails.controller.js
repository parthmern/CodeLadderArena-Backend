// Note: can make it as another service but just do with single file and here in this serivice

const mongoose = require("mongoose");
const { Submission } = require("../models");

async function getSubmissionById(req, res) {
    try {
        const { submissionId } = req.params;
        console.log("submissionId", submissionId);
        const submission = await Submission.findById(submissionId).populate('problemId');

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(submission);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getSubmissionsByUserId(req, res) {
    try {
        const { userId } = req.params;
        console.log("got user id to find all submissions->", userId);

        const submissions = await Submission.find({ userId }).populate('problemId');

        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this user' });
        }

        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function getSubmissionByUserAndProblem(req, res) {
    try {
        const { userId, problemId } = req.params;
        console.log("getSubmissionByUserAndProblem", userId, problemId);
        
    
        let submissions = await Submission.find({ userId });

        submissions = submissions.filter((submission)=>submission.problemId == problemId);

        // if (submissions.length === 0) {
        //     return res.status(404).json({ message: 'No submissions found for this user and problem' });
        // }

        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error });
    }
}


module.exports = {
    getSubmissionById,
    getSubmissionsByUserId,
    getSubmissionByUserAndProblem
}