const app = require('./app');

const fastify = require('fastify')({logger: false});

const PORT = 3000;

fastify.register(app);

fastify.listen({ port: PORT }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }

    console.log(`💚 Submission service started at ${PORT}`);
})
  
