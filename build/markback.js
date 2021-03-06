(function() {
  var Anchor, Block, BlockQuote, Br, EMPHASIS_MARK, Emphasis, Head, Heading, Hr, Inline, MarkbackNode, RULE_MARK, Text, fromDomNode, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MarkbackNode = (function() {
    function MarkbackNode() {}

    MarkbackNode.prototype.convert = function() {
      var child, convertedChildren;

      if (this.domNode.hasChildNodes()) {
        convertedChildren = (function() {
          var _i, _len, _ref, _results;

          _ref = this.domNode.childNodes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(fromDomNode(child, this).convert());
          }
          return _results;
        }).call(this);
        return convertedChildren.join('');
      } else {
        return "";
      }
    };

    MarkbackNode.prototype.prefix = function() {
      var _ref;

      return ((_ref = this.parent) != null ? _ref.prefix() : void 0) || "";
    };

    return MarkbackNode;

  })();

  Inline = (function(_super) {
    __extends(Inline, _super);

    function Inline() {
      _ref = Inline.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Inline.prototype.convert = function() {
      return Inline.__super__.convert.apply(this, arguments);
    };

    return Inline;

  })(MarkbackNode);

  Block = (function(_super) {
    __extends(Block, _super);

    function Block() {
      _ref1 = Block.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Block.prototype.convert = function() {
      var out;

      out = Block.__super__.convert.apply(this, arguments).trim();
      if (out.length === 0) {
        return "";
      } else {
        return "\n" + this.prefix() + out + "\n\n";
      }
    };

    return Block;

  })(MarkbackNode);

  Anchor = (function(_super) {
    __extends(Anchor, _super);

    function Anchor() {
      _ref2 = Anchor.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Anchor.prototype.convert = function() {
      return "[" + Anchor.__super__.convert.apply(this, arguments) + "](" + this.domNode.attributes.href.value + ")";
    };

    return Anchor;

  })(Inline);

  BlockQuote = (function(_super) {
    __extends(BlockQuote, _super);

    function BlockQuote() {
      _ref3 = BlockQuote.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    BlockQuote.prototype.prefix = function() {
      return BlockQuote.__super__.prefix.apply(this, arguments) + "    ";
    };

    return BlockQuote;

  })(Block);

  Br = (function(_super) {
    __extends(Br, _super);

    function Br() {
      _ref4 = Br.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    Br.prototype.convert = function() {
      return "  \n";
    };

    return Br;

  })(Inline);

  EMPHASIS_MARK = '*';

  Emphasis = (function(_super) {
    __extends(Emphasis, _super);

    function Emphasis() {
      _ref5 = Emphasis.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    Emphasis.prototype.convert = function() {
      return "" + EMPHASIS_MARK + Emphasis.__super__.convert.apply(this, arguments) + EMPHASIS_MARK;
    };

    return Emphasis;

  })(Inline);

  Head = (function(_super) {
    __extends(Head, _super);

    function Head() {
      _ref6 = Head.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    Head.prototype.convert = function() {
      return '';
    };

    return Head;

  })(MarkbackNode);

  Heading = (function(_super) {
    __extends(Heading, _super);

    function Heading() {
      _ref7 = Heading.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    Heading.prototype.prefix = function() {
      return Heading.__super__.prefix.apply(this, arguments) + "# ";
    };

    return Heading;

  })(Block);

  RULE_MARK = "- - -";

  Hr = (function(_super) {
    __extends(Hr, _super);

    function Hr() {
      _ref8 = Hr.__super__.constructor.apply(this, arguments);
      return _ref8;
    }

    Hr.prototype.convert = function() {
      return "\n" + RULE_MARK + "\n";
    };

    return Hr;

  })(Block);

  Text = (function(_super) {
    __extends(Text, _super);

    function Text() {
      _ref9 = Text.__super__.constructor.apply(this, arguments);
      return _ref9;
    }

    Text.prototype.convert = function() {
      return this.domNode.textContent.replace(/\s+/g, ' ');
    };

    return Text;

  })(Inline);

  fromDomNode = function(domNode, parent) {
    var markbackNode, nodeName, _ref10;

    nodeName = (_ref10 = domNode.nodeName) != null ? _ref10.toLowerCase() : void 0;
    markbackNode = (function() {
      switch (false) {
        case domNode.nodeType !== window.Node.TEXT_NODE:
          return new Text();
        case nodeName !== 'head':
          return new Head();
        case nodeName !== 'div':
          return new Block();
        case nodeName !== 'p':
          return new Block();
        case nodeName !== 'hr':
          return new Hr();
        case nodeName !== 'blockquote':
          return new BlockQuote();
        case !nodeName.match(/^h\d$/):
          return new Heading();
        case nodeName !== 'a':
          return new Anchor();
        case nodeName !== 'em':
          return new Emphasis();
        case nodeName !== 'i':
          return new Emphasis();
        case nodeName !== 'br':
          return new Br();
        default:
          return new MarkbackNode();
      }
    })();
    markbackNode.domNode = domNode;
    markbackNode.parent = parent;
    return markbackNode;
  };

  window.Markback = function(domNode) {
    if (domNode == null) {
      domNode = document.documentElement;
    }
    return fromDomNode(domNode).convert();
  };

}).call(this);

/*
//@ sourceMappingURL=markback.js.map
*/