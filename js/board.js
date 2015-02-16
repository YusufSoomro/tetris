(function() {
  if (typeof TG === "undefined") {
    window.TG = {}
  }

  var Board = TG.Board = function(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.setupGridHash();
    this.grid = Board.blankGrid(this.numRows, this.numCols);
  };

  Board.BLANK_SYMBOL = ".";

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

  Board.prototype.setupGridHash = function() {
    this.gridHash = {}

    for (var i = 0; i < this.numRows; i++) {
      this.gridHash[i] = [];
    }
  }
})();
