(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var View = Game.View = function ($el) {
    this.$el = $el;
    this.board = new Game.Board(20);
    this.setUpGrid();
    window.setInterval(this.step.bind(this), View.STEP_DELAY);
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_DELAY = 500;

  View.prototype.handleKeyEvent = function (e) {
    if (View.KEYS[e.keyCode]) {
      this.board.snake.turn(View.KEYS[e.keyCode]);
    } else {
      // Other key pressed, ignore
    }
  };

  View.prototype.step = function () {
    this.board.snake.move();
    this.render();
  };

  View.prototype.render = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    // this.updateClasses([this.board.apple.position], "apple");
  };

  View.prototype.updateClasses = function (coords, className) {
    var $li = this.$el.find("li");
    this.$li.filter("." + className).removeClass();

    coords.forEach(function(coord){
      var flatCoord = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(flatCoord).addClass(className);
    }.bind(this));
  };

  View.prototype.setUpGrid = function () {
    var output = "";

    for (var i = 0; i < this.board.dim; i++) {
      output += "<ul>";
      for (var j = 0; j < this.board.dim; j++) {
        output += "<li></li>";
      }
      output += "</ul>";
    }

    this.$el.html(output);
    // this.$li = this.$el.find("li");
  };
})();
