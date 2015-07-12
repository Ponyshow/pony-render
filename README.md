# pony-render

[![Get it on npm](https://nodei.co/npm/pony-render.png)](https://nodei.co/npm/pony-render/)

A full-featured markdown-to-HTML parser for rendering Ponyshow (html-based) presentations.

This is the core rendering engine for Ponyshow presentation app, based on Kramed by Aaron O'Mullan and Marked by Christopher Jeffrey.

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

## Properties

### theme (string)

## linenumbers (boolean)

## Methods

### setHeader()

Sets a prefix string that is returned after tokens are parsed

### setFooter()

Sets a postfix string that is returned after tokens are parsed

### render()

Tokenizes markdown and parses into HTML.  If a header or footer was set, the strings will be concatenated into a final string response.

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## License

Marked: Copyright (c) 2011-2014, Christopher Jeffrey. (MIT License)
Kramed: Copyright (c) 2014, Aaron O'Mullan. (MIT Licensed)
Pony Render: Copyright (c) 2015, TZ Martin (MIT Licensed)

See LICENSE for more info.
