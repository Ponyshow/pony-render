# pony-render

> A full-featured markdown parser and compiler for rendering html-based Ponyshow files.

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

### Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## License

Marked: Copyright (c) 2011-2014, Christopher Jeffrey. (MIT License)
Kramed: Copyright (c) 2014, Aaron O'Mullan. (MIT Licensed)
Pony Render: Copyright (c) 2015, TZ Martin (MIT Licensed)

See LICENSE for more info.
