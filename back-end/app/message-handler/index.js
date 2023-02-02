const {
  createGameEvent,
  playerMovementEvent,
} = require("../ws-evends/wsEvents.json");

module.exports = function socketMessageHandler(message) {
  // Events:
  // createGameEvent
  // playerMovementEvent

  /**
   * handles events
   */
  const { type } = message;
  if (type === createGameEvent) {
    // CRIA JOGO NOVO
    this.sendMessage(response.origin, response);
  } else if (type === playerMovementEvent) {
    // APLICA MOVIMENTO
    this.sendMessage(response.origin, response);
  }

  console.log(" resposta = ", response);
  console.info("! 'db-response' event : Responding from ws-message-handler");
  this.sendMessage(response.origin, response);
};
