const Submission = require('../models/submissionModel');

class SubmissionRepository {
    constructor() {
        this.submissionModel = Submission;
    }

    async createSubmission(submission) {
        const response = await this.submissionModel.create(submission);
        return response;
    }

    async updateSubmission(evaluatedSubmission){
        try{
            const res = await this.submissionModel.findByIdAndUpdate(
                evaluatedSubmission.submissionId, 
                { status: evaluatedSubmission.response.status }, 
                { new: true } 
            );
            console.log("updated submission", res);
            return res;
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }
    
}

module.exports = SubmissionRepository;