const submissionRoutes = require("./submissionRoutes");


async function v1Plugin(fastify, options){
    fastify.register(require("./test/testRoutes"), {prefix: '/test'});

    fastify.register(submissionRoutes, {prefix: '/submission'});
}

module.exports = v1Plugin;