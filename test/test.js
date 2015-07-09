// Quick and dirty test

var fs = require('fs');
var Kramed = require('../lib/kramed-ponyshow');
var Renderer = new Kramed.Renderer();

// Parser Opts
Kramed.setOptions({
  renderer: Renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});


var heading = [];
var sections = 0;
var isPonyFile = false;
var hideSlideNumbers = "";
var hrc = [];


fs.readFile('test.md', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var tokens = Kramed.lexer(data);

  // count HR
  for(var x in tokens) {
    if (tokens[x].type == "hr") {
      hrc.push(x);
    }
  }

  // check if last slide
  if (tokens[hrc[hrc.length-1]]) {
    tokens[hrc[hrc.length-1]].last = true;
  }


  // Check if ponyfile
  for(var x=0;x<tokens.length;x++) {
    if (tokens[x].type == "paragraph") {
      if ((tokens[x].text.indexOf(":") > -1) || (tokens[x].text.indexOf("---") > -1)) {
        isPonyFile = true;
      }
    }
  }


  if (isPonyFile) {
    console.log(Kramed.parser(tokens));
  } else {
    console.log('Not a valid ponyfile');
  }
  
});