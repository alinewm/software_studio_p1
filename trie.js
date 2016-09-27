var Trie = function() {

  var Node = function(value, substring) {
    var that = {};
    var that = Object.create(Node.prototype);
    var children = [];
    var fullWord = false;
    that.getValue = function() {
      return value;
    }
    that.getSubstring = function() {
      return substring;
    }
    that.addChild = function(child) {
      children.push(child);
      return that;
    }
    that.getChildren = function() {
      return children;
    }
    that.hasChildren = function() {
      return children.length>0;
    }
    that.setFullWord = function() {
      fullWord = true;
      return that;
    }
    that.isFullWord = function() {
      return fullWord;
    }
    Object.freeze(that);
    return that;
  }

  var that = {};
  var that = Object.create(Trie.prototype);
  var root = Node('','');

  that.addWord = function(word) {
    var parent = root;
    word.split("").forEach(function(character) {
      matches = (parent.getChildren().filter(function(child) {
        return child.getValue()===character;
      }))
      if (matches.length == 0) {
        var newChild = Node(character, parent.getSubstring() + character);
        parent.addChild(newChild);
        parent = newChild;
      } else {
        parent = matches[0];
      }
    });
    parent.setFullWord();
  };

  that.autocomplete = function(prefix) {    

    findNodeByName = function(word) {
      parent = root;
      word.split("").forEach(function(character) {
        if(parent == null) { return };
        matches = parent.getChildren().filter(function(child) {
          return child.getValue() === character;
        });
        if(matches.length > 0) { parent = matches[0] }
        else { parent = null }
      });
      return parent;
    };

    listFullWordDescendants = function(parent=root) {
      // Given the parent node, corresponding to the prefix, return an array of full words
      // else return an empty array

      // Traverse the nodes, if the node is a full word, populate into the array and continue traversing
      // if it's not a full word, continue traversing
      // Output: an array of words

      if (!parent.hasChildren()) { return []; }
      
      results = parent.getChildren()
      .map(function(child) { 
        if (child.isFullWord()) {
          return listFullWordDescendants(child).concat(child.getSubstring());
        } else {
          return listFullWordDescendants(child);
        }
      })
      .reduce(function(reduced=[], toReduce) { 
        res = reduced.concat(toReduce);   
        return res;
      });
      return results;
    };

    var parent = findNodeByName(prefix);
    if (parent) {
      res = listFullWordDescendants(parent);
      if (parent.isFullWord()) {
        res.push(parent.getSubstring());
      }
      return res.sort().slice(0, 10);
    } else {
      console.log('parent not found')
      return [];
    }
  }

  Object.freeze(that);
  return that;
}