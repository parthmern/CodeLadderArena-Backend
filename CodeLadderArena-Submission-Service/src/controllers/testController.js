// const testService = require("../services/testService");

async function pingRequest (req, res){
    console.log("/test/ping");

    // console.log("fastify obj with testService ===>", this.testService);

    console.log("fastify obj with testService ===>", this.testService);

    const ans = await this.testService.pingCheck();
    return res.send({data: ans});
}

module.exports = {
    pingRequest
};