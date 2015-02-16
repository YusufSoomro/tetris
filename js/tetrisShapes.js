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
    this.segments = [];
    this.centerCol = 20 / 2;
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

  FallingPiece.randomPiece = function() {
    var randomColor = FallingPiece.COLORS[
      Math.floor(Math.random()*FallingPiece.COLORS.length)
    ]

    var randomPieceShape = FallingPiece.SHAPES[
      Math.floor(Math.random()*FallingPiece.SHAPES.length)
    ]

    if (randomPieceShape === "lShapeRight") {
      return FallingPiece.lShapeRight(randomColor);
    } else if (randomPieceShape === "lShapeLeft") {
      return FallingPiece.lShapeLeft(randomColor);
    } else if (randomPieceShape === "blockShape") {
      return FallingPiece.blockShape(randomColor);
    } else if (randomPieceShape === "stickShape") {
      return FallingPiece.stickShape(randomColor);
    } else if (randomPieceShape === "zShapeRight") {
      return FallingPiece.zShapeRight(randomColor);
    } else if (randomPieceShape === "zShapeLeft") {
      return FallingPiece.zShapeLeft(randomColor);
    } else if (randomPieceShape === "plugShape") {
      return FallingPiece.plugShape(randomColor);
    }
  };

  FallingPiece.lShapeRight = function(color) {
    var lShapeRight = new FallingPiece;

    lShapeRight.segments.push(new Block(0, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 1, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 2, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 2, lShapeRight.centerCol + 1, color));

    return lShapeRight;
  };

  FallingPiece.lShapeLeft = function(color) {
    var lShapeLeft = new FallingPiece;

    lShapeLeft.segments.push(new Block(0, lShapeLeft.centerCol, color));
    lShapeLeft.segments.push(new Block(0 + 1, lShapeLeft.centerCol, color));
    lShapeLeft.segments.push(new Block(0 + 2, lShapeLeft.centerCol, color));
    lShapeLeft.segments.push(new Block(0 + 2, lShapeLeft.centerCol - 1, color));

    return lShapeLeft;
  };

  FallingPiece.blockShape = function(color) {
    var blockShape = new FallingPiece;

    blockShape.segments.push(new Block(0, blockShape.centerCol, color));
    blockShape.segments.push(new Block(0 + 1, blockShape.centerCol, color));
    blockShape.segments.push(new Block(0, blockShape.centerCol + 1, color));
    blockShape.segments.push(new Block(0 + 1, blockShape.centerCol + 1, color));

    return blockShape;
  };

  FallingPiece.stickShape = function(color) {
    var stickShape = new FallingPiece;

    stickShape.segments.push(new Block(0, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 1, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 2, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 3, stickShape.centerCol, color));

    return stickShape;
  };

  FallingPiece.zShapeRight = function(color) {
    var zShapeRight = new FallingPiece;

    zShapeRight.segments.push(new Block(0, zShapeRight.centerCol, color));
    zShapeRight.segments.push(new Block(0, zShapeRight.centerCol + 1, color));
    zShapeRight.segments.push(new Block(0 + 1, zShapeRight.centerCol + 1, color));
    zShapeRight.segments.push(new Block(0 + 1, zShapeRight.centerCol + 2, color));

    return zShapeRight;
  };

  FallingPiece.zShapeLeft = function(color) {
    var zShapeLeft = new FallingPiece;

    zShapeLeft.segments.push(new Block(0, zShapeLeft.centerCol, color));
    zShapeLeft.segments.push(new Block(0, zShapeLeft.centerCol - 1, color));
    zShapeLeft.segments.push(new Block(0 + 1, zShapeLeft.centerCol - 1, color));
    zShapeLeft.segments.push(new Block(0 + 1, zShapeLeft.centerCol - 2, color));

    return zShapeLeft;
  };

  FallingPiece.plugShape = function(color) {
    var plugShape = new FallingPiece;

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

    return this;
  }
})();
