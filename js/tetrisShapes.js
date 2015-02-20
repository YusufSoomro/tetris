(function() {
  if (typeof TG === "undefined") {
    window.TG = {}
  }

  var Block = TG.Block = function(rowPos, colPos, color) {
    this.rowPos = rowPos;
    this.colPos = colPos;
    this.color = color;
  };

  Block.SYMBOL = "B";

  Block.prototype.equals = function (block2) {
    return (this.rowPos === block2.rowPos) && (this.colPos === block2.colPos);
  };

  Block.prototype.isOpposite = function (block2) {
    return (this.rowPos == (-1 * block2.rowPos)) && (this.colPos == (-1 * block2.colPos));
  };

  Block.prototype.plus = function (block2) {
    return new Block(this.rowPos + block2.rowPos, this.colPos + block2.colPos);
  };

  FallingPiece = TG.FallingPiece = function(board) {
    this.board = board;
    this.segments = [];
    this.centerCol = this.board.numCols / 2;
  };

  FallingPiece.SHAPES = [
    "lShapeRight",
    "lShapeLeft",
    "blockShape",
    "stickShape",
    "zShapeRight",
    "zShapeLeft",
    "plugShape"
  ];

  FallingPiece.COLORS = [
    "red",
    "blue",
    "yellow",
    "green",
    "purple"
  ];

  FallingPiece.randomPiece = function(board) {
    var randomColor = FallingPiece.COLORS[
      Math.floor(Math.random()*FallingPiece.COLORS.length)
    ]

    var randomPieceShape = FallingPiece.SHAPES[
      Math.floor(Math.random()*FallingPiece.SHAPES.length)
    ]

    if (randomPieceShape === "lShapeRight") {
      return FallingPiece.lShapeRight(randomColor, board);
    } else if (randomPieceShape === "lShapeLeft") {
      return FallingPiece.lShapeLeft(randomColor, board);
    } else if (randomPieceShape === "blockShape") {
      return FallingPiece.blockShape(randomColor, board);
    } else if (randomPieceShape === "stickShape") {
      return FallingPiece.stickShape(randomColor, board);
    } else if (randomPieceShape === "zShapeRight") {
      return FallingPiece.zShapeRight(randomColor, board);
    } else if (randomPieceShape === "zShapeLeft") {
      return FallingPiece.zShapeLeft(randomColor, board);
    } else if (randomPieceShape === "plugShape") {
      return FallingPiece.plugShape(randomColor, board);
    }
  };

  FallingPiece.lShapeRight = function(color, board) {
    var lShapeRight = new FallingPiece(board);

    lShapeRight.segments.push(new Block(0, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 1, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 2, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 2, lShapeRight.centerCol + 1, color));

    return lShapeRight;
  };

  FallingPiece.lShapeLeft = function(color, board) {
    var lShapeLeft = new FallingPiece(board);

    lShapeLeft.segments.push(new Block(0, lShapeLeft.centerCol, color));
    lShapeLeft.segments.push(new Block(0 + 1, lShapeLeft.centerCol, color));
    lShapeLeft.segments.push(new Block(0 + 2, lShapeLeft.centerCol, color));
    lShapeLeft.segments.push(new Block(0 + 2, lShapeLeft.centerCol - 1, color));

    return lShapeLeft;
  };

  FallingPiece.blockShape = function(color, board) {
    var blockShape = new FallingPiece(board);

    blockShape.segments.push(new Block(0, blockShape.centerCol, color));
    blockShape.segments.push(new Block(0 + 1, blockShape.centerCol, color));
    blockShape.segments.push(new Block(0, blockShape.centerCol + 1, color));
    blockShape.segments.push(new Block(0 + 1, blockShape.centerCol + 1, color));

    return blockShape;
  };

  FallingPiece.stickShape = function(color, board) {
    var stickShape = new FallingPiece(board);

    stickShape.segments.push(new Block(0, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 1, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 2, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 3, stickShape.centerCol, color));

    return stickShape;
  };

  FallingPiece.zShapeRight = function(color, board) {
    var zShapeRight = new FallingPiece(board);

    zShapeRight.segments.push(new Block(0, zShapeRight.centerCol, color));
    zShapeRight.segments.push(new Block(0, zShapeRight.centerCol + 1, color));
    zShapeRight.segments.push(new Block(0 + 1, zShapeRight.centerCol + 1, color));
    zShapeRight.segments.push(new Block(0 + 1, zShapeRight.centerCol + 2, color));

    return zShapeRight;
  };

  FallingPiece.zShapeLeft = function(color, board) {
    var zShapeLeft = new FallingPiece(board);

    zShapeLeft.segments.push(new Block(0, zShapeLeft.centerCol, color));
    zShapeLeft.segments.push(new Block(0, zShapeLeft.centerCol - 1, color));
    zShapeLeft.segments.push(new Block(0 + 1, zShapeLeft.centerCol - 1, color));
    zShapeLeft.segments.push(new Block(0 + 1, zShapeLeft.centerCol - 2, color));

    return zShapeLeft;
  };

  FallingPiece.plugShape = function(color, board) {
    var plugShape = new FallingPiece(board);

    plugShape.segments.push(new Block(0, plugShape.centerCol, color));
    plugShape.segments.push(new Block(0 + 1, plugShape.centerCol, color));
    plugShape.segments.push(new Block(0 + 1, plugShape.centerCol - 1, color));
    plugShape.segments.push(new Block(0 + 1, plugShape.centerCol + 1, color));

    return plugShape;
  };

  FallingPiece.prototype.move = function() {
    _.each(this.segments, function(block) {
      block.rowPos += 1
    }, this)
  };

  FallingPiece.prototype.moveLeft = function() {
    this.segments.sort(function compareNumbers(b1, b2) { return b1.colPos - b2.colPos; })

    if (_.every(this.segments, function(block) {
      return this.validPosition(block.rowPos, block.colPos - 1)
    }, this))
    {
      for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].colPos -= 1
      }
    }
  };

  FallingPiece.prototype.moveRight = function() {
    this.segments.sort(function compareNumbers(b1, b2) { return b2.colPos - b1.colPos; })

    if (_.every(this.segments, function(block) {
      return this.validPosition(block.rowPos, block.colPos + 1)
      // debugger;
    }, this))
    {
      for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].colPos += 1
      }
    }
  };

  FallingPiece.prototype.validPosition = function(rowPos, colPos) {
    return (rowPos >= 0 && rowPos < this.board.numRows) &&
      (colPos >= 0 && colPos < this.board.numCols) &&
      (_.filter(this.board.gridHash[rowPos], function(block) {
        if (block) {
          return block.rowPos === rowPos && block.colPos === colPos;
        } else {
          return false;
        }
      }).length === 0);
  };
})();
