"use strict";

const xPiker = document.querySelector(".x-pick");
const oPiker = document.querySelector(".o-pick");
const startMenu = document.querySelector(".start");
const startGame = document.querySelector(".newGame-player");
const main = document.querySelector("main");
const cells = document.querySelectorAll(".cell");

class start {
  player1;
  player2;
  flage = true;
  turn = "x";
  x_win = [];
  o_win = [];
  constructor() {
    this._startMenu();
  }

  _startMenu() {
    startMenu.classList.remove("hidden");
    this.pickShape();
    this.startGmae();
  }

  pickShape() {
    xPiker.addEventListener("click", this.check.bind(this));
    oPiker.addEventListener("click", this.check.bind(this));
  }

  check(e) {
    if (this.flage) {
      if (e.target.classList[0] === "x-pick") {
        this.player1 = "x";
        this.player2 = "o";
        xPiker.classList.add("active-pick");
      }
      if (e.target.classList[0] === "o-pick") {
        this.player1 = "o";
        this.player2 = "x";
        oPiker.classList.add("active-pick");
      }

      this.flage = false;
    }
  }

  startGmae() {
    startGame.addEventListener("click", function () {
      startMenu.classList.add("hidden");
      main.classList.remove("hidden");
    });

    this.choosHome();
    document
      .querySelector(".again")
      .addEventListener("click", this.again.bind(this));
    document
      .querySelector(".btn-next")
      .addEventListener("click", this.next_round.bind(this));
    document
      .querySelector(".btn-quit")
      .addEventListener("click", this.quit.bind(this));    
  }

  choosHome() {
    let self = this;
    const winning = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [7, 5, 3],
      [1, 5, 9],
    ];
    cells.forEach((cell) => {
      cell.addEventListener("click", function () {
        if(cells[cell.dataset.num - 1].hasChildNodes())
          return;
        let html = `
        <div class="xo-${self.turn} nut ">${self.turn}</div>
        `;

        cells[cell.dataset.num - 1].insertAdjacentHTML("afterbegin", html);

        if (self.turn === "x") {
          self.x_win.push(+cell.dataset.num);
        }
        if (self.turn === "o") {
          self.o_win.push(+cell.dataset.num);
        }
    
        winning.forEach(function (win) {
          if (win.every((elem) => self.x_win.includes(elem))) {
            let score_x = parseInt(
              document.querySelector(".score-x").innerHTML
            );
            score_x += 1;
            document.querySelector(".score-x").innerHTML = score_x;

            document.querySelector(".winner").textContent = "X";
            document.querySelector(".win").classList.remove("hidden");
            document.querySelector(".overlay").classList.remove("hidden");
          }
          if (win.every((elem) => self.o_win.includes(elem))) {
            let score_o = parseInt(
              document.querySelector(".score-o").innerHTML
            );
            score_o += 1;
            document.querySelector(".score-o").innerHTML = score_o;

            document.querySelector(".winner").textContent = "O";
            document.querySelector(".win").classList.remove("hidden");
            document.querySelector(".overlay").classList.remove("hidden");
          }
        });

        self.changeTurn();
      });
    });
  }

  changeTurn() {
    let flag = true;

    let turnPlayer = document.querySelector(".turn");
    if (turnPlayer.textContent === "X TURN" && flag === true) {
      turnPlayer.textContent = "O TURN";
      this.turn = "o";
      flag = false;
    }
    if (turnPlayer.textContent === "O TURN" && flag === true) {
      turnPlayer.textContent = "X TURN";
      this.turn = "x";
      flag = false;
    }
  }

  again() {
    document.querySelector(".turn").textContent = "O TURN";
    this.changeTurn();
    this.x_win = [];
    this.o_win = [];
    const contentOfCell = document.querySelectorAll(".nut").forEach(n => n.remove())
  }

  next_round() {
    this.again();
    document.querySelector(".win").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  }
  quit() {
    window.close();
  }
}

const starttt = new start();
