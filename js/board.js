(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Board = Game.Board = function (dim) {
    this.dim = dim;
    this.snake = new Game.Snake(this);
    this.apple = new Game.Apple(this);
  };

  Board.BLANK_SYMBOL = ".";

  Board.prototype.blankGrid = function () {
    var grid = [];

    for (var i = 0; i < this.dim; i++) {
      var row = [];
      for (var j = 0; j < this.dim; j++) {
        row.push(this.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = this.blankGrid();
    this.snake.segments.forEach(function (segment) {
      grid[segment.i][segment.j] = Snake.SYMBOL;
    });

    return grid;
  };

  Board.prototype.validPosition = function (coord) {
    return (coord.i >= 0) &&
           (coord.i < this.dim) &&
           (coord.j >= 0) &&
           (coord.j < this.dim);
  };
})();
