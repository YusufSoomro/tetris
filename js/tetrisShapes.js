(function() {
  if (typeof TG === "undefined") {
    window.TG = {}
  }

  var Block = TG.Block = function(rowPos, colPos, color) {
    this.rowPos = rowPos;
    this.colPos = colPos;
    this.color = color;
  };

  var FallingPiece = TG.FallingPiece = function(board) {
    this.board = board;
    this.segments = [];
    this.centerCol = Math.floor(this.board.numCols / 2);
    this.orient = 0;
  };



  FallingPiece.lShapeRight = function(color, board) {
    var lShapeRight = new FallingPiece(board);

    lShapeRight.positions = [
      [[-2, 1], [-1, 0], [0, -1], [1, 0]], // Switch to upright
      [[1, 2], [0, 1], [-1, 0], [0, -1]], // Switch to flat side up
      [[2, -1], [1, 0], [0, 1], [-1, 0]], // Switch to upside down
      [[-1, -2], [0, -1], [1, 0], [0, 1]] // Switch to flat side down
    ];

    lShapeRight.segments.push(new Block(0, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 1, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 2, lShapeRight.centerCol, color));
    lShapeRight.segments.push(new Block(0 + 2, lShapeRight.centerCol + 1, color));

    return lShapeRight;
  };

  FallingPiece.lShapeLeft = function(color, board) {
    var lShapeLeft = new FallingPiece(board);

    lShapeLeft.positions = [
      [[-1, 2], [0, 1], [1, 0], [0, -1]], // Switch to upright
      [[2, 1], [1, 0], [0, -1], [-1, 0]], // Switch to flat side down
      [[0, -2], [-1, -1], [-2, 0], [-1, 1]], // Switch to upside down
      [[-1, -1], [0, 0], [1, 1], [2, 0]] // Switch to flat side up
    ];

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

    stickShape.positions = [
      [[-1, 1], [0, 0], [1, -1], [2, -2]], // Switch to upright
      [[1, 2], [0, 1], [-1, 0], [-2, -1]], // Switch to sideways
      [[2, -1], [1, 0], [0, 1], [-1, 2]], // Switch to upright
      [[-2, -2], [-1, -1], [0, 0], [1, 1]] // Switch to sideways
    ];

    stickShape.segments.push(new Block(0, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 1, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 2, stickShape.centerCol, color));
    stickShape.segments.push(new Block(0 + 3, stickShape.centerCol, color));

    return stickShape;
  };

  FallingPiece.zShapeRight = function(color, board) {
    var zShapeRight = new FallingPiece(board);

    zShapeRight.positions = [
      [[0, -2], [-1, -1], [0, 0], [-1, 1]], // Switch to flat
      [[0, 2], [1, 1], [0, 0], [1, -1]], // Switch to pointing up
      [[0, -2], [-1, -1], [0, 0], [-1, 1]], // Switch to flat
      [[0, 2], [1, 1], [0, 0], [1, -1]], // Switch to pointing up
    ];

    zShapeRight.segments.push(new Block(0, zShapeRight.centerCol, color));
    zShapeRight.segments.push(new Block(0, zShapeRight.centerCol + 1, color));
    zShapeRight.segments.push(new Block(0 + 1, zShapeRight.centerCol + 1, color));
    zShapeRight.segments.push(new Block(0 + 1, zShapeRight.centerCol + 2, color));

    return zShapeRight;
  };

  FallingPiece.zShapeLeft = function(color, board) {
    var zShapeLeft = new FallingPiece(board);

    zShapeLeft.positions = [
      [[0, 2], [-1, 1], [0, 0], [-1, -1]], // Switch to pointing up
      [[0, -2], [1, -1], [0, 0], [1, 1]], // Switch to pointing right
      [[0, 2], [-1, 1], [0, 0], [-1, -1]], // Switch to pointing down
      [[0, -2], [1, -1], [0, 0], [1, 1]], // Switch to pointing left
    ];

    zShapeLeft.segments.push(new Block(0, zShapeLeft.centerCol, color));
    zShapeLeft.segments.push(new Block(0, zShapeLeft.centerCol - 1, color));
    zShapeLeft.segments.push(new Block(0 + 1, zShapeLeft.centerCol - 1, color));
    zShapeLeft.segments.push(new Block(0 + 1, zShapeLeft.centerCol - 2, color));

    return zShapeLeft;
  };

  FallingPiece.plugShape = function(color, board) {
    var plugShape = new FallingPiece(board);

    plugShape.positions = [
      [[-1, 1], [-1, -1], [0, 0], [1, 1]], // Switch to pointing up
      [[1, 1], [-1, 1], [0, 0], [1, -1]], // Switch to pointing right
      [[1, -1], [1, 1], [0, 0], [-1, -1]], // Switch to pointing down
      [[-1, -1], [1, -1], [0, 0], [-1, 1]] // Switch to pointing left
    ];

    plugShape.segments.push(new Block(0, plugShape.centerCol, color));
    plugShape.segments.push(new Block(0 + 1, plugShape.centerCol - 1, color));
    plugShape.segments.push(new Block(0 + 1, plugShape.centerCol, color));
    plugShape.segments.push(new Block(0 + 1, plugShape.centerCol + 1, color));

    return plugShape;
  };

  FallingPiece.SHAPES = [
    FallingPiece.lShapeRight,
    FallingPiece.lShapeLeft,
    FallingPiece.blockShape,
    FallingPiece.stickShape,
    FallingPiece.zShapeRight,
    FallingPiece.zShapeLeft,
    FallingPiece.plugShape
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
      Math.floor(Math.random() * FallingPiece.COLORS.length)
    ]

    var randomPieceShape = FallingPiece.SHAPES[
      Math.floor(Math.random() * FallingPiece.SHAPES.length)
    ]

    return randomPieceShape(randomColor, board)
  };

  FallingPiece.prototype.move = function(view, board) {

    if (view) {
      if (!board.isBottom()) {
        _.each(this.segments, function(block) {
          block.rowPos += 1
        }, this)
        view.render();
      }
    } else {
      _.each(this.segments, function(block) {
        block.rowPos += 1
      }, this)
    }

  };

  FallingPiece.prototype.moveLeft = function(view) {
    if (_.every(this.segments, function(block) {
      return this.validPosition(block.rowPos, block.colPos - 1)
    }, this))
    {
      for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].colPos -= 1
      }
      view.render();
    }
  };

  FallingPiece.prototype.moveRight = function(view) {
    if (_.every(this.segments, function(block) {
      return this.validPosition(block.rowPos, block.colPos + 1)
    }, this))
    {
      for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].colPos += 1
      }
      view.render();
    }
  };

  FallingPiece.prototype.rotate = function(view) {
    if (!this.positions) {
      return;
    }

    if (_.every(this.segments, function(block) {
      var posToAdd = this.positions[(this.orient + 1) % 4][this.segments.indexOf(block)];

      return this.validPosition(block.rowPos + posToAdd[0], block.colPos + posToAdd[1])
    }, this))
    {
      this.orient = (this.orient + 1) % 4;

      for (var i = 0; i < this.segments.length; i++) {
        var posToAdd = this.positions[this.orient][i];
        this.segments[i].rowPos += posToAdd[0];
        this.segments[i].colPos += posToAdd[1];
      }
      view.render();
    }
  }

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
