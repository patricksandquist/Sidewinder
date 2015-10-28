(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }
  
  var Board = Game.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake();
    // this.apple = new Apple();
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
})();
