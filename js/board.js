(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Board = Game.Board = function (dim) {
    this.dim = dim;
    this.snake = new Game.Snake(this);
    this.apple = new Game.Apple(this);
  };

  Board.prototype.validPosition = function (coord) {
    return (coord.i >= 0) &&
           (coord.i < this.dim) &&
           (coord.j >= 0) &&
           (coord.j < this.dim);
  };
})();
