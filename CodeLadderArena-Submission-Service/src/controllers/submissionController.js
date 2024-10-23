// const testService = require("../services/testService");

async function pingRequest (req, res){
    console.log("/test/ping");

    

    console.log("fastify obj with testService ===>", this.testService);

    const ans = await this.testService.pingCheck();
    return res.send({data: ans});
}

async function createSubmission(req, res) {
    console.log(req.body);
    console.log("create submission", this); // fastify obj
    const response = await this.submissionService.addSubmission(req.body);
    return res.status(201).send({
        error: {},
        data: response,
        success: true,
        message: 'Created submission successfully'
    })

}

module.exports = {
    pingRequest,
    createSubmission
};