var _ = require('lodash'),
  Kramed = require('./kramed'),
  Renderer = new Kramed.Renderer();

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
  
  self.debug = options.debug||false;
  
  self.version = require('../package.json').version;
  
  self.heading = (options.heading) ? options.heading : [];
  self.sections = (options.sections) ? options.sections : 0;
  self.hideSlideNumbers = (options.hideSlideNumbers) ? options.hideSlideNumbers : "";
  self.hrc = (options.hrc) ? options.hrc : [];
  
  self.error = (options.error) ? options.error : "<div class='rendererror'><div class='img'></div><br><div class='text'>Rendering error</div></div>";

  self.header = options.header;
  self.footer = options.footer;
  
  self._theme = false;
  self.isPonyFile = false;
  
  Renderer.ponyoptions = {
    format: "",
    slidenumbers: true,
    footer: 'Pony Show',
    timing:false,
    progress:true,
    transition:false,
    shadows:false
  };

  Renderer.list = function(body, ordered) {
    var type = ordered ? 'ol' : 'ul', out="", cls="";
    
    out = '<' + type + '>\n' + body + '</' + type + '>\n';
    
    if (self.sections > 0 || !self.isPonyFile) {
      return out;
    } else {
      self.heading.push(out);
      return '';
    }
  };
  
  Renderer.listitem = function(text) {
    var cls="";
    if (Renderer.ponyoptions.buildLists) {
      cls = "next";
    }
    
    return '<li class="'+cls+'">' + text + '</li>\n';
  }
    
  Renderer.hr = function(cls,id) {
    var out = null;
    var timing = false;
    
    // set format for each section
    if (Renderer.ponyoptions.format) {
      cls = Renderer.ponyoptions.format + " " + cls;
    }
    
    // Set timing option
    if (Renderer.ponyoptions.timing) {
      timing = 'data-timing="'+Renderer.ponyoptions.timing+'"';
    }

    if (self.sections == 0) {

      // heading
      if (self.heading.length > 0) {
        out = self.heading.join('') + "</header>\n";
      }

      out = out+"\n<section class=\"slide "+cls+"\" id=\""+id+"\" "+timing+">\n<div>\n";
    } else {
      
      if (self.sections == self.hrc.length) {
        out = "\n</div>\n</section>\n";
      } else {
        out = "</div>\n</section>\n\n<section class=\"slide "+cls+"\" id=\""+id+"\" "+timing+">\n<div>\n";
      }
    }
    
    self.sections++;
    
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
      
      // add line breaks
      if (text.indexOf("\n") > -1) {
        arr = text.split("\n");
      } else {
        arr.push(text);
      }
      
      for (x in arr) {
        var img = text.indexOf("![");
        // detect image
        pre = (img) ? "" : "<p>";
        post = (img) ? "\n" : "</p>\n";
      }
              
      out = pre+arr.join('\n<span class="br"></span>\n')+post;      
      
    } else {

      // Check if options exists




        // Add to heading
        if (self.sections == 0 && self.heading.length > 0) {
          
          self.heading.push("<p>"+text+"</p>\n");
        }



    }
    return out||"";
  }
  
  // images are rendered as paragraph / text
  Renderer.image = function(href, title, text) {

    var out = null;
    var str = text.split(' ');
    var cls = "";
    var style = null;
    var pos = null;

    switch(str[0]) {
      case 'absolute':
        pos = 'absolute';
        str.shift();
        style = str.join('');
        cls = "place";
        break;
      case 'fixed':
        pos = 'fixed';
        str.shift();
        style = str.join('');
        break;
        
      case 'fit':
        cls = "fit";
        break;
      
      case 'css':
        str.shift();
        style = str.join('');
        break;
        
      default:
    }
    
    if (Renderer.ponyoptions.shadows) {
      cls = cls+" shadow";
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
  
  Renderer.link = function(href, title, text) {
    if (this.options.sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
      } catch (e) {
        return '';
      }
      if (prot.indexOf('javascript:') === 0) {
        return '';
      }
    }
    var out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ' target="_blank">' + text + '</a>';
    return out;
  };
  
  Renderer.code = function(text,lang) {
    return '<pre><code class="language-'+lang+'">'+text+'</code></pre>';
  }
  
  Renderer.table = function(header, body) {
    
    return '<table class="'+Renderer.ponyoptions.tableclass+'">\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + '<tbody>\n'
      + body
      + '</tbody>\n'
      + '</table>\n';
  }
  
}

Pony.prototype.setHeader = function(str){
  this.header = str;
}

Pony.prototype.setFooter = function(str){
  this.footer = str;
}

Pony.prototype.setDebug = function(bool) {
  this.debug = bool;
}

Pony.prototype.log = function(args) {
  if (this.debug) {
    console.log(args);
  }
}

Pony.prototype.render = function(dat,opts) {
  
  var self = this;
  
  var header, footer, LEXED, htmlClass;
  
  // Set options (if avail)
  var _globalopts = opts||{};
  
  // Reset
  this.heading = [];
  this.sections = 0;
  this.hideSlideNumbers = "";
  this.hrc = [];
 
  var tokens = Kramed.lexer(dat);
  
  // Check if first token is configuration
  if (tokens[0].type == "paragraph") {
    if (tokens[0].text.indexOf("\n") > -1) {
      
      self.isPonyFile = true;
      
      // rebase tokens
      var rebase = tokens.shift();
      
      var arr = rebase.text.split("\n");
      
      // Parse options
      for(var x=0;x<arr.length;x++) {
        
        opts = arr[x].split(":");
                
        var _key = opts[0].trim().toLowerCase();
        var _prop = opts[1].trim().toLowerCase();
        
        self.log(_key + " = " + _prop);
                
        switch(_key) {
      
          case 'theme':
            Renderer.ponyoptions.theme = _prop;
            break;
      
          case 'footer':
            Renderer.ponyoptions.footer = _prop;
            break;
      
          case 'slidenumbers':
            Renderer.ponyoptions.slidenumbers = (_prop == "false") ? false : true;
            break;
          
          case 'timing':
            Renderer.ponyoptions.timing = _prop;
            break;
          
          case 'error':
            self.error = opts[1].trim();
            break;
            
          case 'tableclass':
            Renderer.ponyoptions.tableclass = _prop||"";
            break;
          
          case 'format':
            Renderer.ponyoptions.format = _prop||"";
            break;
            
          case 'progress':
            Renderer.ponyoptions.progress = (_prop == "false") ? false : true;
            break;
          
          case 'build-lists':
            Renderer.ponyoptions.buildLists = (_prop == "false") ? false : true;
            break;
          
          case 'transition':
            Renderer.ponyoptions.transition = _prop;
            break;
          
          case 'shadows':
            Renderer.ponyoptions.shadows = (_prop == "false") ? false : true;
            break;
          
          default:
            //out = "<p>"+text+"</p>";
        }
      
      }
      
    }
  }
  
  self.log(tokens);
  
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
  if (!self.isPonyFile) {
    for(var x=0;x<tokens.length;x++) {
      if (tokens[x].type == "paragraph") {
        if ((tokens[x].text.indexOf("\n---\n") > -1)) {
          self.isPonyFile = true;
        }
      }
    }
  }

  
  LEXED = Kramed.parser(tokens);
  
  self.log(LEXED);
  self.log('___________');

  if (LEXED.length == 0) {
    LEXED = self.error;
  }
  
  // Merge file config with global configs giving preference to file config
  Renderer.ponyoptions = _.assign(_globalopts, Renderer.ponyoptions);
          
  if (!Renderer.ponyoptions.slidenumbers) {
    self.hideSlideNumbers = '<style>.slide:after{display:none;}</style>';
  }
  
  // Apply transition 
  if (Renderer.ponyoptions.transition) {
    htmlClass = Renderer.ponyoptions.transition;
    
    // update defined header
    if (self.header) {
      self.header = self.header.replace(/(<html.*)(>).*?<head/mgi, '$1 class="'+htmlClass+'"');
    }
  }
        
  header = self.header||'<!DOCTYPE HTML>' +
  '<html lang="en" class="'+htmlClass+'">\n' +
  '<head>\n' +
  	'<title>Pony Show IDE</title>\n' +
  	'<meta charset="utf-8">\n' +
  	'<meta name="viewport" content="width=792, user-scalable=no">\n' +
  	'<meta http-equiv="x-ua-compatible" content="ie=edge">\n' +
  	'<link rel="stylesheet" href="css/main.css">\n' +
  	'<link rel="stylesheet" href="themes/'+Renderer.ponyoptions.theme+'/styles/screen.css">\n' +
  	self.hideSlideNumbers +
  '</head>\n' +
  '<body class="list" data-plugins="next timer markdown">\n\n';
        
  footer = self.footer||'<script src="js/main.js"></script>\n' +
  '</body>\n' +
  '</html>';
    
  if (Renderer.ponyoptions.progress) {
    footer = '\n<div class="progress"><div></div></div>\n' + footer;
  }
  
  // Check if last section.
  if (self.sections == self.hrc.length) {
    LEXED = LEXED+"\n</div>\n</section>\n";
  }
  
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