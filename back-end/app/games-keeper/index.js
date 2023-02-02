const GameState = require("../game");
const variables = require("../utls/utils");

class GamesKeeper {
  constructor() {
    this.games = [];

    this.controlVariable = false;
    setInterval(() => {
      if (this.controlVariable) return;
      this.controlVariable = true;
      const now = new Date().getTime();
      for (let i = 0; i < this.games.length; i++) {
        let game = this.games[i];
        if (game.startTime < now - 30 * variables.MINUTE) {
          let last_game = this.games.pop();
          this.games[i] = last_game;
          break;
        }
      }

      this.controlVariable = false;
    }, variables.MINUTE * 10);
  }

  criaJogo(Player1_id, Player2_id) {
    this.games.push(new GameState(Player1_id, Player2_id));
  }

  playerMovement(gameID, player_id, peca, newPos) {
    const index = this.games.findIndex((i) => i.gameID === gameID);
    return this.games[index].movimento(player_id, peca, newPos);
  }
}

module.exports = new GamesKeeper();
