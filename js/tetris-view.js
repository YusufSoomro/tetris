(function() {
  if (typeof TG === "undefined") {
    window.TG = {}
  }

  var View = TG.View = function ($el) {
    this.$el = $el;

    this.board = new TG.Board(32, 10);
    this.setupGrid();

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );

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
      if (event.keyCode === 37) {
        this.board.fallingPiece.moveLeft();
      } else if (event.keyCode === 39) {
        this.board.fallingPiece.moveRight();
      } else if (event.keyCode === 38) {
        this.board.fallingPiece.rotate();
      }
    }
  };

  View.prototype.render = function () {

    _.each(this.board.gridHash, function(blockArr) {
      this.updateClasses(blockArr, "block-heap")
    }, this)

    this.updateClasses(this.board.fallingPiece.segments, "block");
  };

  View.prototype.updateClasses = function(coords, className) {
    if (className === "block") {
      this.$li.filter("." + className).css("background-color", "#404040");
      this.$li.filter("." + className).removeClass();
    }

    coords.forEach(function(block){
      var flatCoord = (block.rowPos * this.board.numCols) + block.colPos;
      this.$li.eq(flatCoord).addClass(className);
      this.$li.eq(flatCoord).css("background-color", block.color)
    }.bind(this));
  };

  View.prototype.removeClasses = function(coords) {
    coords.forEach(function(block){
      var flatCoord = (block.rowPos * this.board.numCols) + block.colPos;
      this.$li.eq(flatCoord).removeClass();
      this.$li.eq(flatCoord).css("background-color", "#404040")
    }.bind(this));
  };

  View.prototype.setupGrid = function () {
    var html = "";

    for (var i = 0; i < this.board.numRows; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.numCols; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    $('ul').slice(0, 4).css("display", "none");
    this.$li = this.$el.find("li");
  };

  View.prototype.step = function () {
    this.board.move(this);
    this.render();
    this.isOver();
  };

  View.prototype.isOver = function() {
    var $topLiRow = $('ul').eq(4).find('li');

    _.each($topLiRow, function(li) {
      var $li = $(li);

      if ($li.attr("class") === "block-heap") {
        alert("You lose!");
        window.clearInterval(this.intervalId);
      }
    }, this)
  };
})();
