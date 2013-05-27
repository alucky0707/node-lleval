
var
argv   = process.argv,
fs     = require('fs'),
util   = require('util'),
lleval = require('../index.js');

var
lang    = argv[2],
srcFile = argv[3];

console.log('');

//show help
if(!lang || lang == '-h' || lang == '--help') {
  console.log('It is the demo of lleval.');
  console.log('');
  console.log('Simple usage:');
  console.log('  node-lleval <srcFile>');
  console.log('  node-lleval <lang> <srcFile>');
  console.log('  node-lleval -e <src>');
  console.log('  node-lleval <lang> -e <src>');
  console.log('or');
  console.log('  node-lleval --help');
  console.log('  node-lleval --langs');
  console.log('');
  console.log('Arguments:');
  console.log('  lang    : the language name showed `--langs` option');
  console.log('  srcFile : the source file');
  console.log('  src     : the source');
  console.log('');
  console.log('Options:');
  console.log('  -h, --help  : show this help');
  console.log('  -l, --langs : show supported languages');
  console.log('');
  process.exit(0);

//show languages
}else if(lang == '-l' || lang == '--langs') {
  lleval.languages(function(err, data) {
    var
    language = 'language name',
    execute_command = 'execute command',
    line = '',
    maxLength = language.length;
    if(err) {
      console.log('request error');
      process.exit(-1);
    }
    Object.keys(data).forEach(function(name) {
      maxLength = max(name.length, maxLength);
    });
    line += '  ' + language;
    line += Array(maxLength - language.length + 2).join(' ');
    line += '| ' + execute_command;
    console.log(line);
    console.log('  ' + Array(line.length - 2 + 1).join('-'));
    Object.keys(data).forEach(function(name) {
      util.print('  ' + name);
      util.print(Array(maxLength - name.length + 2).join(' '));
      util.print('| ' + data[name]);
      util.print('\n');
    });
    process.exit(0);
  });
  
//evaluate srcFile
}else{
  if(!srcFile) {
    srcFile = lang;
    lang = '';
  }
  
  //read srcFile
  if(srcFile === '-e') {
    callback(null, argv.slice(argv.indexOf('-e') + 1).join(' '));    
  }else{
    fs.readFile(srcFile, 'utf8', callback);
  }
  
  function callback(err, src) {
    if(err) {
      console.log('read file error');
      process.exit(-1);
    }
    
    lleval.evaluate(lang, src, function(err, data) {
      if(err) {
        console.log('request error');
        process.exit(-1);
      }
      
      console.log('  lang     : %s', data['lang']);
      console.log('  status   : %s', data['status']);
      console.log('  syscalls : %d', data['syscalls']);
      console.log('  time     : %d', data['time']);
      console.log('  stdout   : \n%s', format(data['stdout']));
      console.log('  stderr   : \n%s', format(data['stderr']));
      process.exit(0);
    });
  }
}

//util functions
function max(x, y){
  return x > y ? x : y;
}

function format(text) {
  return text.split('\n').map(function(t) {
    return '    ' + t;
  }).join('\n');
}
