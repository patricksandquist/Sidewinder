(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Apple = Game.Apple = function (board) {
    this.board = board;
    this.replace();
  };

  Apple.prototype.replace = function () {
    var appleCoord = this.generateCoord();

    // Don't place an apple where there is a snake
    while (this.board.snake.isOccupying(appleCoord)) {
      appleCoord = this.generateCoord();
    }

    this.position = appleCoord;
  };

  Apple.prototype.generateCoord = function () {
    // Generate a random location on the board
    return new Coord(
      Math.floor(Math.random() * this.board.dim),
      Math.floor(Math.random() * this.board.dim)
    );
  };
})();
