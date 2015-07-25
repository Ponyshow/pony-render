# pony-render

[![Get it on npm](https://nodei.co/npm/pony-render.png)](https://nodei.co/npm/pony-render/)

A fast markdown tokenizer and renderer for creating beautiful HTML presentations.  This is the core rendering engine for [Ponyshow](http://github.com/PonyShow/ponyshow) presentation app and is compatible with the [Shower](https://github.com/shower/shower) HTML presentation library.

Based on Kramed (Aaron O'Mullan) and Marked (Christopher Jeffrey), this rendering engine adds additional tokens for parsing embedded options and rendering logic for creating semantic HTML output.

## Displaying Content

For viewing rendered output, you can use the [ponyshow-web-client](http://github.com/ponyshow/ponyshow-web-client) library or [Shower](https://github.com/shower/shower) framework.  The Ponyshow web client is the main client library for [Ponyshow](http://github.com/PonyShow/ponyshow) and is optimized for `pony-render`.  It includes a forked version of the Shower library, Prism and default CSS files.

## Why?

Creating slides and delivering quality presentations is often a painful process to manage, especially for technical presentations.  While markdown is great for writing content, it is bad for giving presentations.  This project resolves this issue by rendering Markdown into semantically correct HTML that conforms to presentation purposes.  It's also the heart of [Ponyshow](http://github.com/PonyShow/ponyshow).

## Install

``` bash
npm install pony-render --save
```

## Usage

Simple usage:

```js
var Pony = require('pony-render');
console.log(Pony.render('I am using __markdown__.'));
// Outputs: <p>I am using <strong>markdown</strong>.</p>
```
## Syntax Docs

The syntax supports markdown, kramdown and a wide range of additional tokens needed to keep content simple, yet offer flexible rendering. The docs are not yet available, but you can refer to the [Ponyshow Cheet Sheet](https://github.com/Ponyshow/deck-CheatSheet) to get an idea of what's possible.

Official docs are in process.


## Error

### Responses

If a render fails, the response will be an html doc that contains a `rendererror` class that you can style to fit your needs.

**Default output**

```html
<div class='rendererror'>
  <img alt='pony error' /><br>
  <div>Rendering error</div>
</div>
```

**Custom HTML**

You can set the `error` property to a custom string on initialization, within a `deck.md` or prior to rendering with a setter function.  This will override the default response structure while rendering.

**Example**

```javascript

// init
Pony.init({"error":"<img src='' />"})

// setter function
setError("<img src='' />");

// in deck.md
error: <img src='' />

```

## API

### Properties

- `theme`: Set the theme name for custom rendering purposes
- `slidenumbers`: true/false to hide/show slide numbers. Custom themes can override this.
- `timing`: Set any value to automatically advance to the next slide after given time. 
- `footer`: Set a string visible on each slide footer. Custom themes can override this.
- `error`: Set a fail string

If you want additional properties please open a ticket.  Ideas are welcomed!  Or, (better yet) fork and send a pull request.

### Methods

#### `setHeader(<string> html)`

Sets a prefix string to the final rendering object, after tokens are parsed.

*Returns:* **none**

#### `setFooter(<string> html)`

Sets a postfix string to the final rendering object, after tokens are parsed.

*Returns:* **none**

#### `render(<string> html, <object> properties)`
  
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
