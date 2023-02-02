const GameState = require("../game");
const variables = require("../utls/utils");

class GamesKeeper {
  constructor() {
    this.games = [];

    this.controlVriable = false;

    setInterval(() => {
      if (this.controlVriable) return;
      this.controlVriable = true;
      const now = new Date().getTime();
      for (let i = 0; i < this.games.length; i++) {
        let game = this.games[i];
        if (game.startTime < now - 30 * variables.MINUTE) {
          let last_game = this.games.pop();
          this.games[i] = last_game;
          break;
        }
      }

      this.controlVriable = false;
    }, variables.MINUTE * 10);
  }

  criaJogo() {
    this.games.push(new GameState());
  }

  playerMovement(gameID, player_id, peca, newPos) {
    const index = this.games.findIndex((i) => i.gameID === gameID);
    return this.games[index].movimento(player_id, peca, newPos);
  }
}

module.exports = new GamesKeeper();
