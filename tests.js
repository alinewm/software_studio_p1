(function() {
  mocha.setup("bdd");
  var assert = chai.assert;
  var expect = chai.expect;

  beforeEach(function() {
    testTrie = Trie();
  });

  describe("Trie", function() {
    describe("autocomplete", function() {
      it("should return no results if search term isn't in the dictionary", function() {
        assert.lengthOf(testTrie.autocomplete('zzz'), 0);
      });

      it("should return the full word itself and any other words that begins with it", function() {
        ['foot', 'football', 'footer'].forEach(function(word) { testTrie.addWord(word) });
        expect(testTrie.autocomplete('foot')).eql(['foot', 'football', 'footer']);
      });

      it("should return results in lexicographical order", function() {
        input = ['a', 'ab', 'ac'];
        input.forEach(function(substring) {
          testTrie.addWord(substring);
        })
        suggestions = testTrie.autocomplete('a');
        expect(suggestions).eql(input);
      });

      it("should return at most 10 results", function() {
        'asdfwqertghjdgf'.split('').forEach(function(letter) {
          testTrie.addWord('a' + letter);
        });
        assert.isAtMost(testTrie.autocomplete('a').length,10);
      })
    });

    describe("addWord", function() {
      it("should add word to the dictionary", function() {
        testTrie.addWord('hello');
        assert.include(testTrie.autocomplete('h'), 'hello');
      });
    })
  });

  mocha.run();
})()
