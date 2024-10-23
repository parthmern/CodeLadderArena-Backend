const app = require('./app');
const { PORT } = require('./config/serverConfig');

const fastify = require('fastify')({logger: true});

fastify.register(app);  // registering plugin "app"

fastify.listen({ port: PORT }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }

    console.log(`💚 Submission service started at ${PORT}`);
})
  
