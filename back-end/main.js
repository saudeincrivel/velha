require("dotenv").config();
const keepAlive = require("./app/websocket-connection/keepalive-service/keepalive");
const { publicConnection } = require("./app/websocket-connection/websocket");


/**
 * Websocket connection
 *
 **/
publicConnection.on("request", function (request) {
  console.info("Incomming connection request from -----> : ", request.origin);
  keepAlive.addConnection(request);
});


/**
 * Message-Bus handler injection
 *
 **/
async function main() {
  console.log("program running ...");
}
main();
