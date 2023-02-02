const { illformed, messageConnected } = require("../ws-responses");
const messageHandler = require("../message-handler");

class KeepAlive {
  constructor() {
    this.connectionsNum = 0;
    this.mapa = new Map();
    this.lastMessage = new Map();
    this.MessageHandler = messageHandler.bind(this);
    /**
     * *Subscribe to Messenger Event-Bus!
     **/
    setInterval(() => {
      this.checkConnections();
    }, 30 * SECOND);

    setInterval(() => {
      this.broadCastMessage({
        type: "h",
        content: "h",
        maticPrice: getPrice(),
      });
    }, 15 * SECOND);
  }

  sendMessage(receiver, messageBody) {
    //troca origin pra connection object  << - 
    receiver = this.mapa.get(receiver);
    receiver.send(JSON.stringify(messageBody));
  }
  /**
   * Call back of any message
   * @memberof KeepAlive
   * @param origin Ip of emimter of message if message is external
   * @return void
   */
  messageReceived(origin, connection, msg) {
    console.log("UNPARSED MESSAGE : ", msg);
    msg = JSON.parse(msg);
    if (!msg.type) {
      console.error("***ERROR: Message ill formed!");
      this.sendMessage(origin, illformed);
      return;
    }
    
    console.info("Messsage received from origin : ", origin);
    console.info("Received Message: ", msg);
    this.MessageHandler(msg);
    this.lastMessage.set(origin, new Date().getTime());
  }
  /**
   *
   * @memberof KeepAlive
   * Helper function bind call back to class
   * @param origin Ip of emimter of message if message is external
   * @param connection websocket object connection
   * @return void
   */
  enrichConnection(origin, connection) {
    const ref = this.messageReceived.bind(this);
    connection.on(
      "message",
      function (message) {
        ref(origin, connection, message.utf8Data);
      },
      ref,
      origin
    );
    const rem = this.removeConnection.bind(this);
    connection.on(
      "close",
      function () {
        console.info("Client has disconnected!");
        rem(origin);
      },
      rem,
      origin
    );
  }
  /**
   * applies check for fixed TTL for every connection
   * @memberof KeepAlive
   * @return void
   */
  checkConnections() {
    for (const [origin, lastDate] of this.lastMessage.entries()) {
      const now = new Date().getTime();
      if (now - lastDate > THREEMINUTES) {
        this.removeConnection(origin);
      }
    }
  }
  /**
   * Adds a connection
   * @memberof KeepAlive
   * @param newConnection websocket object
   * @return void
   */
  addConnection(request) {
    const origin = request.origin;
    if (this.mapa.has(origin)) {
      console.info(origin, "Client already connected!");
      return;
    }
    const connection = request.accept(null, origin);
    console.info("Public connection created for origin:", origin);
    this.enrichConnection(origin, connection);

    this.connectionsNum += 1;
    this.mapa.set(origin, connection);
    this.lastMessage.set(origin, new Date().getTime());
    connection.send(JSON.stringify(messageConnected));

    console.info(
      "Numero de conexoes :  ",
      this.connectionsNum,
      " connections.."
    );
    console.info("Connection origin : ", origin);
  }
  /**
   * Removes a connection
   * @memberof KeepAlive
   * @param origin websocket object
   * @return void
   */
  removeConnection(origin) {
    const thisConnection = this.mapa.get(origin);
    if (!thisConnection) {
      return;
    }
    console.log("objeto conexao = ", thisConnection?.close);
    console.info("Removing connection from : ", origin);
    thisConnection?.send(JSON.stringify(JSON.stringify(timeoutMessage)));
    thisConnection?.close();
    console.log("ESTAADO  = ", thisConnection.state);
    this.mapa.delete(origin);
    this.lastMessage.delete(origin);
    this.connectionsNum -= 1;
  }
  /**
   * BroadCastas messages to all users ( NEVER GONNa use this )
   * @memberof KeepAlive
   * @param msg message content string
   * @return void
   */
  broadCastMessage(msg) {
    for (const [origin, connection] of this.mapa.entries()) {
      connection.send(JSON.stringify(msg));
    }
  }
}

const keepAlive = new KeepAlive();
module.exports = keepAlive;
