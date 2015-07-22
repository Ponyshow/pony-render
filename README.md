# pony-render

[![Get it on npm](https://nodei.co/npm/pony-render.png)](https://nodei.co/npm/pony-render/)

A fast markdown-to-HTML tokenizer and HTML renderer for creating (html-based) presentations.  This is the core rendering engine for the [Ponyshow](http://github.com/PonyShow/ponyshow) presentation app and is compatible with the [Shower](https://github.com/shower/shower) HTML presentation library.

Based on Kramed by Aaron O'Mullan and Marked by Christopher Jeffrey.

## Displaying Content

For viewing rendered output, use the [ponyshow-web-client](http://github.com/ponyshow/ponyshow-web-client) library.  This client library is optimized for `pony-render` and includes an updated Shower library, Prism and default CSS files.

## Why?

Creating slides and delivering quality presentations is often a painful process to manage, especially for technical presentations.  Markdown is great for writing content, but bad at presentations.  This project resolves this issue by rendering Markdown into HTML-based Ponyshow presentations (on the fly).

## Install

``` bash
npm install pony-render --save
```

## Usage

Minimal usage:

```js
var Pony = require('pony-render');
console.log(Pony.render('I am using __markdown__.'));
// Outputs: <p>I am using <strong>markdown</strong>.</p>
```

## API

### Properties

- `theme`: 
- `slidenumbers`: 
- `timing`: Set any value to automatically advance to the next slide after given time. 
- `footer`: Set a string visible on each slide footer

### Methods

#### `setHeader()`

Sets a prefix string that is returned after tokens are parsed

#### `setFooter()`

Sets a postfix string that is returned after tokens are parsed

#### `render(<string> HTML, <object> properties)`
  
*Returns:* HTML

Tokenizes markdown and parses into HTML.  If a header or footer was set, the strings will be concatenated into a final string response.

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## License

Pony Render: Copyright (c) 2015, Semantic Press, Inc. (MIT Licensed)
Marked: Copyright (c) 2011-2014, Christopher Jeffrey. (MIT License)
Kramed: Copyright (c) 2014, Aaron O'Mullan. (MIT Licensed)

See LICENSE for more info.

<img
src="http://c.statcounter.com/10534093/0/9ad73f33/1/"
alt="website statistics" style="border:none;">
