(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Coord = Game.Coord = function (i, j) {
    // A coordinate class
    this.i = i;
    this.j = j;
  };

  Coord.prototype.equals = function (coord2) {
    return (this.i == coord2.i && this.j == coord2.j);
  };

  Coord.prototype.isOpposite = function (coord2) {
    return (this.i == (-1 * coord2.i) && this.j == (-1 * coord2.j));
  };

  Coord.prototype.plus = function (coord2) {
    return new Cord(this.i + coord2.i, this.j + coord2.j);
  };

  var Board = Game.Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake();
    this.apple = new Apple();
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
  };

  var Snake = Game.Snake = function () {
    // A Snake class that stores the current direction and an array of segments
    this.dir = "N";
    this.segments = [new Cord(5, 5)];
  };

  Snake.SYMBOL = "S";

  Snake.DIFFS = {
    // The coordinate differences for each direction of movement
    "N": new Coord(0, -1),
    "E": new Coord(1, 0),
    "S": new Coord(0, 1),
    "W": new Coord(-1, 0)
  };

  Snake.prototype.head = function () {
    // Returns the head coordinate object
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.move = function () {
    // move snake forward
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };
})();
