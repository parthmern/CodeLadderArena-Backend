const TestService = require("./testService");
// const testService = require("./testService");
const fastifyPlugin = require("fastify-plugin");

async function servicePlugin(fastify, option) {
    //fastify.decorate('testService', testService); // inside fastify object it will add key named testService which has function under it
    fastify.decorate('testService', new TestService())

}

module.exports = fastifyPlugin(servicePlugin); 