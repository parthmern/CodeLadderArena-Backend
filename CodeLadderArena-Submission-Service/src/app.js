const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const repositoryPlugin = require('./repositories/repositoryPlugin');

async function app(fastify,option) {
    
    fastify.register(require('@fastify/cors'));
    
    fastify.register(repositoryPlugin);

    fastify.register( require("./routes/api/apiRoutes"), {prefix : '/api'} );

    fastify.register(servicePlugin);

}

module.exports = fastifyPlugin(app);    // APP function becomes fastify plugin and afterwards we need to register this plugin with fastify instance
