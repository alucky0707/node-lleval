var
assert = require('should'),
lleval = require('../index.js');

describe('call lleval API', function() {
  var
  lang = 'pl',
  src = 'print("Hello, World!");',
  result = {
    stdout: 'Hello, World!',
    stderr: '',
  },
  languages = null;
  
  it('call languages', function(done) {
    lleval.languages(function(err, data) {
      if(err) {
        assert.fail('request error');
      }
      assert.exists(data);
      assert.exists(data[lang]);
      languages = data;
      done();
    });
  });
  
  it('call evaluate', function() {
    if(!languages || !languages[lang]) {
      assert.fail('`call language` missing?');
    }
    lleval.evaluate(lang, src, function(err, data) {
      if(err) {
        assert.fail('request error');
      }
      assert.exists(data);
      assert.not.exists(data['error']);
      Object.keys(result).forEach(function(key) {
        assert.exists(data[key]);
        result[key].should.strictEqual(data[key]);
      });
    });
  });
});
