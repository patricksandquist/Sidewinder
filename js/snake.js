(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Snake = Game.Snake = function (board) {
    this.dir = "N";
    this.turning = false; // to prevent snake from turning back on itself
    this.board = board;

    var center = new Game.Coord(
      Math.floor(board.dim/2),
      Math.floor(board.dim/2)
    );
    this.segments = [center];
    this.growTurns = 0;
    this.score = 0;
    this.dead = false;
  };

  Snake.DIFFS = {
    // The coordinate differences for each direction of movement
    "N": new Game.Coord(-1, 0),
    "E": new Game.Coord(0, 1),
    "S": new Game.Coord(1, 0),
    "W": new Game.Coord(0, -1)
  };

  Snake.GROW_TURNS = 3;

  Snake.prototype.head = function () {
    // Returns the head coordinate object
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.eatApple = function () {
    if (this.head().equals(this.board.apple.position)) {
      this.growTurns += 3;
      this.score += 1;
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.move = function () {
    // move snake forward
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
    this.turning = false;

    // eat an apple if it's there
    if (this.eatApple()) {
      this.board.apple.replace();
    }

    if (this.growTurns > 0) {
      // grow
      this.growTurns -= 1;
    } else {
      // remove one from the tail (front of the array)
      this.segments.shift();
    }

    // destroy snake if it eats itself or hits wall
    if (!this.isValid()) {
      this.dead = true;
    }
  };

  Snake.prototype.isValid = function () {
    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(this.head())) {
        return false;
      }
    }

    return true;
  };

  Snake.prototype.turn = function (newDir) {
    // avoid turning directly back on yourself
    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[newDir]) ||
    this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = newDir;
    }
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
