(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var View = Game.View = function ($el) {
    this.$el = $el;
    this.board = new Game.Board(20);
    $(window).on("keydown", this.handleKeyEvent.bind(this));

    window.setInterval(this.step.bind(this), View.STEP_DELAY);
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
    this.$el.html(this.board.render());
  };
})();
