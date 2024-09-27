const winston = require("winston");
const { LOG_DB_URL } = require("./server.config");
const CosmosDBTransport = require("../clientapis/CosmosDBTransport");

require('winston-mongodb'); // diff pkg ( for sql db winston-sqlite pkg is there )

const allowedTransports = [];

// The below transport enables Cosmos DB logging
allowedTransports.push(new CosmosDBTransport({
    level: 'error'
}));

// The below transport configuration enables logging on the console
allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({ all: true }), // Colorize the entire log message
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((log) => {
            // If there's a stack trace, log it
            if (log.stack) {
                console.log("log stack present");
                return `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}\n${log.stack}`;
            }
            console.log("log stack not present", log);
            return `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`;
        })
    )
}));

// The below transport configuration enables logging in mongodb database(using "winston-mongodb" pkg)
allowedTransports.push(new winston.transports.MongoDB({
    level : 'error',
    db : LOG_DB_URL ,
    collection : 'logs',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json() // Store logs in JSON format in MongoDB
    )
}));

// The below transport configuration enables logging in txt file
allowedTransports.push(new winston.transports.File({
    filename: `app.log`
}))

const logger = winston.createLogger({

    // DEFAULT FORMAT
    format: winston.format.combine(

        // timestamp type
        winston.format.timestamp({
            format : 'YYYY-MM-DD HH:MM:SS'
        }),

        // what is going printed into log ( which format )
        winston.format.printf((log)=> `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`)
    ),

    // where to print
    transports : allowedTransports 
})


module.exports = logger; 