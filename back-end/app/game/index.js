const { v4} = require('uuid');

class Peca {
  constructor(tam, owner, pos) {
    this.tam = tam;
    this.owner = owner;
    this.pos = pos;
  }
}

class GameState {
  constructor(Player1_id, Player2_id) {
    this.startTime = new Date().getTime();
    this.gameID = v4();
    this.Player1_id = Player1_id;
    this.Player2_id = Player2_id;
    this.p1_pecas = [];
    this.p2_pecas = [];

    for (let i = 0; i < 5; i++) {
      this.p1_pecas.push(new Peca(i, Player1_id, { x: -1, y: -1 }));
      this.p2_pecas.push(new Peca(i, Player2_id, { x: -1, y: -1 }));
    }

    this.grid = [
      [[], [], []],
      [[], [], []],
      [[], [], []],
    ];
  }

  outOfBounds({ x, y }) {
    return x < 0 || y < 0 || x >= 9 || y >= 9;
  }

  alteraPeca(player_id, peca, nova_peca) {
    if (player_id === this.Player1_id) {
      let index = this.p1_pecas.findIndex(peca);
      this.p1_pecas[index] = nova_peca;
    } else {
      let index = this.p2_pecas.findIndex(peca);
      this.p2_pecas[index] = nova_peca;
    }
  }

  movimento(player_id, peca, newPos) {
    function isValid(player_id, peca, newPos) {
      const { x, y } = newPos;
      if (outOfBounds(newPos)) return false;
      let tam_new = this.grid[x][y].length;
      if (tam_new) {
        let aquelaPeca = this.grid[nx][ny][tam_new - 1];
        if (aquelaPeca.tam > peca.tam) return false;
        if (aquelaPeca.owner !== player_id) return false;
      }
      return true;
    }

    if (!isValid(player_id, peca, newPos)) {
      return { message: "Movimento Invalido" };
    }
    this.alteraPeca(player_id, peca, { ...peca, x: x, y: y });

    peca.pos = newPos;
    this.grid[x][y].push(peca);

    return this.grid;
  }
}

module.exports = GameState;
