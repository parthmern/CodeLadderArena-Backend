const express = require("express"); // Import express
const { createServer } = require("http"); // Import http
const { Server } = require("socket.io"); // Import socket.io


const app = express(); // Create express app
app.use(bodyParser.json());
const httpServer = createServer(app); // Create http server using express app

io.on("connection", (socket) => {

});

httpServer.listen(3001, () => {
    console.log("Socket Server is running on port 3001");
}); 