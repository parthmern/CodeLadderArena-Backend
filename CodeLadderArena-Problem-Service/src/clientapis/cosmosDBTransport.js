const Transport = require('winston-transport');
const { logToCosmosDB } = require('./cosmosClient');


class CosmosDBTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.level = opts.level || 'info'; // You can define the log level here
  }

  async log(info, callback) {
    try {
      setImmediate(() => this.emit("logged", info));
  
      // Use the Cosmos DB logger function inside try block
      await logToCosmosDB(info.level, info.message);
  
      // Invoke callback to let Winston know that the log was successful
      callback();
    } catch (error) {
      console.error("Failed to log to CosmosDB:", error);
  
      // Pass the error to the callback to signal a failure in logging
      callback(error);
    }
  }
}

module.exports = CosmosDBTransport;
