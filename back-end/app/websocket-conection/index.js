const http = require("http");
const WebSocketServer = require("websocket").server;
const publicServer = http.createServer();

publicServer.listen(9898);
console.log(`Websockets running on ports ${9898} ${443}`);
const publicConnection = new WebSocketServer({
  httpServer: publicServer,
});

module.exports = {
  publicConnection,
};
