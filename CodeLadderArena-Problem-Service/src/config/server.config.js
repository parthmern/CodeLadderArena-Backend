const dotenv = require("dotenv");

dotenv.config();

// console.log(require('dotenv').config());

module.exports ={
    PORT: process.env.PORT || 3001,
    ATLAS_DB_URL : process.env.ATLAS_DB_URL ,
    NODE_ENV : process.env.NODE_ENV,
    LOG_DB_URL : process.env.LOG_DB_URL,
    COSMOS_ENDPOINT : process.env.COSMOS_ENDPOINT,
    COSMOS_KEY : process.env.COSMOS_KEY,
    COSMOS_DBID : process.env.COSMOS_DBID,
    COSMOS_CONTAINERID : process.env.COSMOS_CONTAINERID,
    JWT_SECRET : process.env.JWT_SECRET,
    SUBMISSIONSERVICE_URL : process.env.SUBMISSIONSERVICE_URL,
    CLIENTSIDE_URL : process.env.CLIENTSIDE_URL
}