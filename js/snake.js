(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Snake = Game.Snake = function () {
    // A Snake class that stores the current direction and an array of segments
    this.dir = "N";
    this.segments = [new Coord(5, 5)];
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

    // take one off of the back of the snake (front of the array)
    this.segments.shift();
  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

  Snake.prototype.isOccupying = function (coord) {
    // Returns true if part of the snake is on the given coordinate
    this.segments.forEach(function (segment) {
      if (segment.i === coord.i && segment.j === coord.j) {
        return true;
      }
    });
    return false;
  };
})();
