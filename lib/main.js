var Kramed = require('./kramed');
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



;(function() {
  
/**
 * Markdown to Shower
 * return: string
 * 
*/

function Pony(options) {
  
  var self = this;
  
  var options = options || {};
  
  this.heading = (options.heading) ? options.heading : [];
  this.sections = (options.sections) ? options.sections : 0;
  this.hideSlideNumbers = (options.hideSlideNumbers) ? options.hideSlideNumbers : "";
  this.hrc = (options.hrc) ? options.hrc : [];
  
  this.header = options.header;
  this.footer = options.footer;
  
  this._theme = false;
  this.isPonyFile = false;
  
  Renderer.ponyoptions = {
    theme: 'deckset',
    slidenumbers: true,
    footer: 'Pony Show',
    timing:false
  };

  // Renderer.heading = function (text, level) {
  //   var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  //   return '<h' + level + '><a name="' + escapedText + '" class="anchor" href="#' + escapedText + '"><span class="header-link"></span></a>' + text + '</h' + level + '>';
  // };

  Renderer.hr = function(cls,id) {
    self.sections++;
    var out = null;
    var timing = false;

    if (this.options.timing) {
      timing = 'data-timing="'+this.options.timing+'"';
    }

    if (!self.sections%2) {
      if (self.sections == self.hrc.length) {
        out = "\n</div>\n</section>\n";
      } else {
        out = "</div>\n</section>\n\n<section class=\"slide "+cls+"\" id=\""+id+"\" "+timing+">\n<div>\n";
      }
    } else {
      
      if (self.sections == 1) {

        // heading
        if (self.heading.length > 0) {
          out = self.heading.join('') + "</header>\n";
        }

        out = out+"\n<section class=\"slide "+cls+"\" id=\""+id+"\" "+timing+">\n<div>\n";
      } else {
        out = "</div>\n</section>\n\n<section class=\"slide "+cls+"\" id=\""+id+"\" "+timing+">\n<div>\n";
      }
      

    }

    return out||"";
  }

  Renderer.heading = function (text, level) {
    var out = false;
    
    // var str = text.split('[');
    // var style = null;
    // 
    // switch(str[0]) {
    //   case 'absolute':
    //     str.shift();
    //     style = str.join('');
    //     break;
    // 
    //   default:
    // }
    
    if (self.sections == 0 && self.heading.length == 0 && self.isPonyFile) {
      self.heading.push('<header class="caption">\n');
      self.heading.push('<h' + level + '>' + text + '</h' + level + '>\n');
    } else if (self.sections == 0 && self.isPonyFile && (self.heading.length > 1)) {          
      self.heading.push('<h' + level + '>' + text + '</h' + level + '>\n');
    } else {
      // default
      out = '<h' + level + ' class="fit">' + text + '</h' + level + '>\n';
    }
    
    return (out) ? out : "";
  };

  Renderer.paragraph = function(text) {
    var out = null;
    var arr = [];

    if (self.sections > 0 || !self.isPonyFile) {
      return "<p>"+text+"</p>";
    } else {

      // Check if options exists
      var opts = text.indexOf(":");
      if (opts > -1) {
        
        if (text.indexOf("\n") > -1) {
          arr = text.split("\n");
        } else {
          arr.push(text);
        }
        
        //console.log(arr);
        
        // Parse options
        for(var x=0;x<arr.length;x++) {
        
          //console.log(arr[x]);
          
          opts = arr[x].split(":");
          
          //console.log(opts);
          
          switch(opts[0]) {
        
            case 'theme':
              //_theme = opts[1].trim();
              Renderer.ponyoptions.theme = opts[1].trim();
              break;
        
            case 'footer':
              Renderer.ponyoptions.footer = opts[1].trim();
              break;
        
            case 'slidenumbers':
              Renderer.ponyoptions.slidenumbers = (opts[1].trim() == "false") ? false : true;
              console.log(':::::::'+Renderer.options.slidenumbers);
              break;
            
            case 'timing':
              Renderer.ponyoptions.timing = opts[1].trim();
              break;
              
            default:
              //out = "<p>"+text+"</p>";
          }
        
        }


      } else {

        // Add to heading
        if (self.sections == 0 && self.heading.length > 0) {
          self.heading.push("<p>"+text+"</p>\n");
        }

      }

    }
    return out||"";
  }
  
  Renderer.image = function(href, title, text) {

    var str = text.split(' ');
    var cls = "";
    var style = null;
    var pos = null;
    
    if (text) {
      cls = "place";
    }

    switch(str[0]) {
      case 'absolute':
        pos = 'absolute';
        str.shift();
        style = str.join('');
        break;
      case 'fixed':
        pos = 'fixed';
        str.shift();
        style = str.join('');
        break;
        
      default:
    }

    var out = '<img src="' + href + '" alt="' + text + '" class="' + cls + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    if (style) {
      out += ' style="position: ' + pos + ';' + style + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;

  }
  
  Renderer.code = function(text,lang) {
    return '<pre><code class="language-'+lang+'">'+text+'</code></pre>';
  }
  
  
}

Pony.prototype.setHeader = function(str){
  this.header = str;
}

Pony.prototype.setFooter = function(str){
  this.footer = str;
}

Pony.prototype.render = function(dat) {
  
  var self = this;
  
  // Reset
  this.heading = [];
  this.sections = 0;
  this.hideSlideNumbers = "";
  this.hrc = [];
 
  var tokens = Kramed.lexer(dat);
  
  // count HR
  for(var x in tokens) {
    if (tokens[x].type == "hr") {
      self.hrc.push(x);
    }
  }

  
  if (tokens[self.hrc[self.hrc.length-1]]) {
    tokens[self.hrc[self.hrc.length-1]].last = true;
  }

  
  // Check if ponyfile
  for(var x=0;x<tokens.length;x++) {
    if (tokens[x].type == "paragraph") {
      if ((tokens[x].text.indexOf(":") > -1) || (tokens[x].text.indexOf("---") > -1)) {
        self.isPonyFile = true;
      }
    }
  }
  
  var LEXED = Kramed.parser(tokens);

  if (LEXED.length == 0) {
    LEXED = "<div style=\"margin-top:40px;\"><img width='20%' src='/images/404.sleepingpony.png' alt='sleeping pony' /><br>Pony parser incomplete.</div>";
  }
        
  if (!Renderer.ponyoptions.slidenumbers) {
    self.hideSlideNumbers = '<style>.slide:after{display:none;}</style>';
  }      
        
  var header = self.header||'<!DOCTYPE HTML>' +
  '<html lang="en">' +
  '<head>' +
  	'<title>Pony Show IDE</title>' +
  	'<meta charset="utf-8">' +
  	'<meta name="viewport" content="width=792, user-scalable=no">' +
  	'<meta http-equiv="x-ua-compatible" content="ie=edge">' +
  	'<link rel="stylesheet" href="/css/main.css">' +
  	'<link rel="stylesheet" href="/themes/'+Renderer.ponyoptions.theme+'/styles/screen.css">' +
  	self.hideSlideNumbers +
  '</head>' +
  '<body class="list" data-plugins="next timer markdown">';
        
  var footer = self.footer||'<div class="progress"><div></div></div>' +
    '<script src="/js/main.js"></script>' +
  '</body>' +
  '</html>';
        
  return header+LEXED+footer;
  
};



if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = new Pony;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return Pony; });
} else {
  this.render = new Pony;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());