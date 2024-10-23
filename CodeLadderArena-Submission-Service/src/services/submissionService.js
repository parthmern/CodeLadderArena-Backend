const submissionQueueProducer = require("../producers/submissionQueueProducer");

class SubmissionService {

    constructor(){
        
    }

    async pingCheck(){
        return "pong";
    }    

    async addSubmission(submission){
        const response = await submissionQueueProducer(submission);
        return response ;
    }

}


module.exports = SubmissionService;
