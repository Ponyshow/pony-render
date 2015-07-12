// Quick and dirty test

var fs = require('fs');
var Pony = require('../lib/main');


fs.readFile('test.md', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  console.log(Pony.render(data, {theme:"TEST"}));
  
});