(function() {
  if (typeof TG === "undefined") {
    window.TG = {}
  }

  var Board = TG.Board = function(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.fallingPiece = TG.FallingPiece.randomPiece(this);

    this.gridHash = Board.setupGridHash(this.numRows);
  };

  Board.BLANK_SYMBOL = ".";

  Board.setupGridHash = function(numRows) {
    var gridHash = {}

    for (var i = 0; i < numRows; i++) {
      gridHash[i] = [];
    }

    return gridHash;
  };

  Board.blankGrid = function (numRows, numCols) {
    var grid = [];

    for (var i = 0; i < numRows; i++) {
      var row = [];
      for (var j = 0; j < numCols; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  };

  // TODO: add the segments of a falling piece to the board

  // Board.prototype.addBlocks = function(fallingPieceObj) {
  //
  // }

  Board.prototype.render = function() {
    var grid = Board.blankGrid(this.numRows, this.numCols);

    _.each(this.gridHash, function(blockArr, numRow) {
      _.each(blockArr, function(block) {
        this.grid[block.rowPos][block.colPos] = Block.SYMBOL
      }, this)
    }, this)
  };

  Board.prototype.addBlocks = function(fallingPiece) {
    _.each(fallingPiece.segments, function(block) {
      this.gridHash[block.rowPos][block.colPos] = block
    }, this)
  };

  Board.prototype.move = function() {
    if (this.isBottom()) {
      this.addBlocks(this.fallingPiece)
      this.fallingPiece = TG.FallingPiece.randomPiece(this);
    } else {
      this.fallingPiece.move();
    }
  };

  Board.prototype.isBottom = function() {
    var isBottom = false;

    _.each(this.fallingPiece.segments, function(block) {
      var nextRowPos = block.rowPos + 1;
      var nextColPos = block.colPos;

      if (nextRowPos === this.numRows ||
        this.gridHash[nextRowPos][nextColPos]) {
        isBottom = true;
        return;
      }
    }, this)

    return isBottom;
  };
})();
