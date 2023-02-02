require("dotenv").config();
const keepAlive = require("./app/keep-alive");
const gamesKeeper = require("./app/games-keeper");
const { publicConnection } = require("./app/websocket-conection");

/**
 * Websocket connection
 *
 **/
publicConnection.on("request", function (request) {
  console.info("Incomming connection request from -----> : ", request.origin);
  keepAlive.addConnection(request);
});
