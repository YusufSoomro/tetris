(function() {
  if (typeof TG === "undefined") {
    window.TG = {}
  }

  var View = TG.View = function ($el) {
    this.$el = $el;

    // this.board = new TG.Board(20);
    this.setupGrid();

    // this.intervalId = window.setInterval(
    //   this.step.bind(this),
    //   View.STEP_MILLIS
    // );

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    38: "rotate",
    39: "moveRight",
    40: "speedUp",
    37: "moveLeft"
  };

  View.STEP_MILLIS = 100;

  View.prototype.handleKeyEvent = function (event) {
    if (View.KEYS[event.keyCode]) {
      // this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  };

  View.prototype.render = function () {
    // simple text based rendering
    // this.$el.html(this.board.render());

    // this.updateClasses(this.board.snake.segments, "snake");
    // this.updateClasses([this.board.apple.position], "apple");
  };

  View.prototype.updateClasses = function(coords, className) {
    // this.$li.filter("." + className).removeClass();
    //
    // coords.forEach(function(coord){
    //   var flatCoord = (coord.i * this.board.dim) + coord.j;
    //   this.$li.eq(flatCoord).addClass(className);
    // }.bind(this));
  };

  View.prototype.setupGrid = function () {
    // var html = "";
    //
    // for (var i = 0; i < this.board.dim; i++) {
    //   html += "<ul>";
    //   for (var j = 0; j < this.board.dim; j++) {
    //     html += "<li></li>";
    //   }
    //   html += "</ul>";
    // }
    //
    // this.$el.html(html);
    // this.$li = this.$el.find("li");
  };

  View.prototype.step = function () {
    // if (this.board.snake.segments.length > 0) {
    //   this.board.snake.move();
    //   this.render();
    // } else {
    //   alert("You lose!");
    //   window.clearInterval(this.intervalId);
    // }
  };
})();
