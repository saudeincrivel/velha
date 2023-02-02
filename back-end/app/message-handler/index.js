const {
  createGameEvent,
  playerMovementEvent,
} = require("../ws-evends/wsEvents.json");
const gamesKeeper = require("../games-keeper");

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
    // gamesKeeper.criaJogo();
    this.sendMessage(response.origin, response);
  } else if (type === playerMovementEvent) {
    // APLICA MOVIMENTO
    // gamesKeeper.playerMovement();
    this.sendMessage(response.origin, response);
  }

  console.info(" resposta = ", response);
  console.info("! 'db-response' event : Responding from ws-message-handler");
  this.sendMessage(response.origin, response);
};
