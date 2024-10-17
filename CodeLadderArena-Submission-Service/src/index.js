const fastify = require('fastify')({logger: false});

const PORT = 3000;

fastify.get('/ping', function handler (req, res) {
    console.log("pong");
    res.code(200).send({ data: 'pong' });
})

fastify.listen({ port: PORT }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }

    console.log(`Submission service started at ${PORT}`);
})
  
