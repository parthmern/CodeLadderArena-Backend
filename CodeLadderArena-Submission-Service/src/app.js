const fastifyPlugin = require('fastify-plugin');

async function app(fastify,option) {
    fastify.register(require('@fastify/cors'));

    // register test routes
    fastify.register(require('./routes/testRoutes'), {prefix: '/test'});    // /test/ping

}

module.exports = fastifyPlugin(app);
