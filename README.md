#lleval

It is evaluate some program language on Node.js.
 [lleval](http://colabv6.dan.co.jp/lleval.html) APIs wrapper for Node.js.

##Example

Evaluate JavaScript.

```javascript
var
lleval = require('lleval');

lleval.evaluate('js', 'print("Hello");', function(err, data) {
  if(err) {
    console.log('request error');
    return;
  }
  
  console.log(data);
});
```

Evaluate Ruby2.0.

```javascript
var
lleval = require('lleval');

lleval.evaluate('rb20', 'puts "Hello"', function(err, data) {
  if(err) {
    console.log('request error');
    return;
  }
  
  console.log(data);
});
```

And more.

##Command Line Tool

Please do,

```
$ node-lleval -h
```

##Supported Language

See also, [lleval](http://colabv6.dan.co.jp/lleval.html).
