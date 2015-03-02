(function() {
  if (typeof TG === "undefined") {
    window.TG = {}
  }

  var View = TG.View = function ($el) {
    this.$el = $el;

    this.board = new TG.Board(32, 10);
    this.setupGrid();

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    32: "dropPiece",
    38: "rotate",
    39: "moveRight",
    40: "speedUp",
    37: "moveLeft"
  };

  View.STEP_MILLIS = 200;

  View.prototype.handleKeyEvent = function (event) {
    if (View.KEYS[event.keyCode]) {
      if (event.keyCode === 37) {
        this.board.fallingPiece.moveLeft(this);
      } else if (event.keyCode === 39) {
        this.board.fallingPiece.moveRight(this);
      } else if (event.keyCode === 38) {
        this.board.fallingPiece.rotate(this);
      } else if (event.keyCode === 32) {
        this.board.dropPiece(this);
      } else if (event.keyCode === 40) {
        this.board.fallingPiece.move(this, this.board)
      }
    }
  };

  View.prototype.render = function () {

    this.pieceShadow();
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
        if (!this.alerted) { alert("You lose!"); this.alerted = true; }
        window.clearInterval(this.intervalId);
      }
    }, this)
  };

  View.prototype.scoreUp = function() {
    var $score = $('#score-num');
    var $lines = $('#lines-num');

    $score.text(parseInt($score.text()) + 50);
    $lines.text(parseInt($lines.text()) + 1);
  };

  View.prototype.startGame = function() {
    if (!this.gameStarted) {
      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.STEP_MILLIS
      );
      this.gameStarted = true;
    }
  };

  View.prototype.pieceShadow = function() {
    var fallingPiecePositions = _.map(this.board.fallingPiece.segments, function(block) {
      return [block.rowPos, block.colPos];
    })

    while (!this.shadowIsBottom(fallingPiecePositions)) {
      _.each(fallingPiecePositions, function(pos) {
        pos[0] += 1
      })
    }

    this.updateShadowClasses(fallingPiecePositions, "shadow");
  };

  View.prototype.shadowIsBottom = function(positions) {
    var isBottom = false;

    _.each(positions, function(pos) {
      var nextRowPos = pos[0] + 1;
      var nextColPos = pos[1];

      if (nextRowPos === this.board.numRows ||
        this.board.gridHash[nextRowPos][nextColPos]) {
        isBottom = true;
        return;
      }
    }, this)

    return isBottom;
  };

  View.prototype.updateShadowClasses = function(coords, className) {
    this.$li.filter("." + className).css("background-color", "#404040");
    this.$li.filter("." + className).removeClass();

    coords.forEach(function(pos){
      var flatCoord = (pos[0] * this.board.numCols) + pos[1];
      this.$li.eq(flatCoord).css("background-color", "#778899");
      this.$li.eq(flatCoord).addClass("shadow");
    }.bind(this));
  };
})();
