const { v4 } = require("uuid");
const variables = require("../utls/utils");

class Peca {
  constructor(tam, owner, pos, z) {
    this.tam = tam;
    this.owner = owner;
    this.pos = pos;
    this.z = z || -1;
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
  /**
   *
   * check if x,y is out of bounds!
   * @param {*} pos{ x, y }
   * @return {boolean}
   * @memberof GameState
   */
  privateOutOfBounds(pos) {
    const { x, y } = pos;
    return x < 0 || y < 0 || x >= 9 || y >= 9;
  }

  /**
   *  altera peca no array de pecas..
   *
   * @param {*} player_id
   * @param {*} peca
   * @param {*} nova_peca
   * @memberof GameState
   */
  privateAlteraPecas(player_id, peca, nova_peca) {
    if (player_id === this.Player1_id) {
      const index = this.p1_pecas.findIndex((x) => variables.compare(x, peca));
      this.p1_pecas[index] = nova_peca;
    } else {
      const index = this.p2_pecas.findIndex((x) => variables.compare(x, peca));
      this.p2_pecas[index] = nova_peca;
    }

    if (peca.x !== -1) {
      const index = this.grid[peca.x][peca.y].findIndex((x) =>
        variables.compare(x, peca)
      );
      this.grid[peca.x][peca.y].splice(index, 1);
    }
  }

  /**
   * returns current game state
   *
   * @return {Object <GameState>}
   * @memberof GameState
   */
  privateCurrentState() {
    return {
      Player1_id: this.Player1_id,
      Player2_id: this.Player2_id,
      p1_pecas: this.p1_pecas,
      p2_pecas: this.p2_pecas,
      grid: this.grid,
    };
  }

  /**
   * applies movement no game
   *
   * @param {*} player_id
   * @param {*} peca
   * @param {*} newPos
   * @return {*}
   * @memberof GameState
   */
  movimento(player_id, peca, newPos) {
    if (!player_id) return this.privateCurrentState();
    const isValid = function (player_id, peca, newPos) {
      if (peca.owner !== player_id) return false;
      const { x, y } = newPos;
      if (this.privateOutOfBounds(newPos)) return false;
      let tam_new = this.grid[x][y].length;
      if (tam_new) {
        let aquelaPeca = this.grid[nx][ny][tam_new - 1];
        if (aquelaPeca.tam > peca.tam) return false;
      }
      return true;
    };
    const isValidBindded = isValid.bind(this);
    if (!isValidBindded(player_id, peca, newPos)) {
      return { message: "Movimento Invalido!" };
    }

    this.privateAlteraPecas(player_id, peca, {
      ...peca,
      pos: newPos,
    });

    peca.pos = newPos;
    this.grid[newPos.x][newPos.y].push(peca);
    return this.privateCurrentState();
  }
}

module.exports = GameState;

// /**
//  *pseudo unit test
//  *
//  * @param {*} state
//  * @return {*}
//  */
// function mostraState(state) {
//   return JSON.stringify(state, null, 2);
// }

// // function main() {
// //   const jogo = new GameState(1, 2);
// //   console.log(mostraState(jogo.movimento()));
// //   const p = {
// //     tam: 1,
// //     pos: { x: -1, y: -1 },
// //     owner: 1,
// //   };
// //   const novo = {
// //     x: 0,
// //     y: 0,
// //   };
// //   console.log(" noovonvovnovo\n\n\n");
// //   console.log(mostraState(jogo.movimento(1, p, novo)));
// // }

// // main();
