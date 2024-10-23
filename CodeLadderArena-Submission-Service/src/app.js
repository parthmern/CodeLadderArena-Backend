const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const todoRoutes = require('./routes/api/todoRoutes');

async function app(fastify,option) {
    
    fastify.register(require('@fastify/cors'));

    // register test routes
    // fastify.register(require('./routes/api/test/testRoutes'), {prefix: '/test'});    // /test/
    
    fastify.register( require("./routes/api/apiRoutes"), {prefix : '/api'} );

    fastify.register(servicePlugin);

    fastify.register(todoRoutes, {prefix:"/todo"});

}

module.exports = fastifyPlugin(app);    // APP function becomes fastify plugin and afterwards we need to register this plugin with fastify instance
