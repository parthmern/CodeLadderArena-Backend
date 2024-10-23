const submissionQueueProducer = require("../producers/submissionQueueProducer");

class SubmissionService {

    constructor(submissionRepository){
        this.submissionRepository = submissionRepository;
    }

    async pingCheck(){
        return "pong";
    }     

    async addSubmission(submission){

        console.log("submission we are getting =>", submission);

        const createdSubmission = await this.submissionRepository.createSubmission(submission);

        if(!createdSubmission){
            throw {message: "not able to create submission"}
        }

        console.log("createdSubmission in db =>", createdSubmission);

        // adding job into submissionQueue
        const response = await submissionQueueProducer(submission);

        return {queueResponse : response, submission : createdSubmission} ;
    }

}


module.exports = SubmissionService;
