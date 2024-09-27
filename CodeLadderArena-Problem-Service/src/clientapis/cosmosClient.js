const {CosmosClient} = require("@azure/cosmos");
const { COSMOS_ENDPOINT, COSMOS_KEY, COSMOS_DBID, COSMOS_CONTAINERID } = require("../config/server.config");

const endpoint = COSMOS_ENDPOINT;
const key = COSMOS_KEY;
const dbId = COSMOS_DBID;
const containerId = COSMOS_CONTAINERID;

const client = new CosmosClient({ endpoint, key });
const database = client.database(dbId);
const container = database.container(containerId);

async function logToCosmosDB(level,message) {
    try{
        await container.items.create({
            timeStamp : new Date().toISOString(),
            level : level,
            message : message
        });

        console.log("log entry created in cosmosDB");
    }
    catch(error){
        console.log("error in logging to cosmos db");
    }
}

module.exports={
    logToCosmosDB
}