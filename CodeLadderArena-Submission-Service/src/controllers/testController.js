const testService = require("../services/testService");

async function pingRequest (req, res){
    console.log("/test/ping");

    const ans = await testService.pingCheck();
    return res.send({data: ans});
}

module.exports = {
    pingRequest
};