const submissionQueueProducer = require("../producers/submissionQueueProducer");

class SubmissionService {

    constructor(submissionRepository){
        this.submissionRepository = submissionRepository;
    }

    async pingCheck(){
        return "pong";
    }     

    async addSubmission(submission){
        const createdSubmission = this.submissionRepository.createSubmission(submission);

        if(!createdSubmission){
            throw {message: "not able to create submission"}
        }

        console.log(createdSubmission);

        const response = await submissionQueueProducer(submission);
        return {queueResponse : response, submission : createdSubmission} ;
    }

}


module.exports = SubmissionService;
