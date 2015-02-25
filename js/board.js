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

  Board.prototype.render = function() {
    var grid = Board.blankGrid(this.numRows, this.numCols);

    _.each(this.gridHash, function(blockArr, numRow) {
      _.each(blockArr, function(block) {
        this.grid[block.rowPos][block.colPos] = Block.SYMBOL
      }, this)
    }, this)
  };

  Board.prototype.addBlocks = function(fallingPiece, view) {
    _.each(fallingPiece.segments, function(block) {
      this.gridHash[block.rowPos][block.colPos] = block
    }, this)

    this.deleteRow(view);
  };

  Board.prototype.move = function(view) {
    if (this.isBottom()) {
      this.addBlocks(this.fallingPiece, view)
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

  Board.prototype.deleteRow = function(view) {
    _.each(this.gridHash, function(blocksArr, rowPos) {
      var rowFull = true;

      if (blocksArr.length === this.numCols) {
        _.each(blocksArr, function(block) {
          if (!block) {
            rowFull = false;
          }
        })
      } else {
        return;
      }


      if (rowFull) {
        this.moveRowsDown(rowPos, view);
        view.scoreUp();
      }
    }, this)
  };

  Board.prototype.moveRowsDown = function(rowPos, view) {
    _.each(this.gridHash, function(blockArr) {
      view.removeClasses(blockArr)
    }, this)

    for (var i = rowPos; i > -1; i--) {
      view.removeClasses(this.gridHash[rowPos]);
      this.gridHash[i] = this.gridHash[i - 1];
      _.each(this.gridHash[i], function(block) {
        if (block) {
          block.rowPos += 1
        }
      }, this)
    }

    this.gridHash[0] = []
  };
})();
