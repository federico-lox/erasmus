Erasmus [![npm version](https://badge.fury.io/js/erasmus.svg)](https://badge.fury.io/js/erasmus)
=======
![Alt text](http://www.wga.hu/detail/h/holbein/hans_y/1525/07erasmu.jpg "Erasmus von Rotterdam, who gently lent his name for this project.")

*A simple tool for literate programming.*

Overview
--------
In it's current version, Erasmus is a very simple tool to extract all the code
blocks in a markdown document for further processing (e.g. storing in a separate
file).

Erasmus was born from the difficulty in achieving such a simple task with more
complex tools such as [litpro](https://github.com/jostylr/litpro).

Installation
------------
Erasmus is available through NPM, to install it globally as a CLI tool use:

```bash
npm install -g erasmus
```

If you want to install it locally to your project to use it as a
dependency, then just use the following command from the project's folder:

```bash
npm install --save erasmus
```

Usage
-----
Erasmus is designed following the UNIX principles, running the following command
will print out the code extracted from a markdown document to the terminal:

```bash
erasmus document.md
```

To save the extracted code to a file, use IO redirection:

```bash
erasmus document.md > code.js
```

It can also be used programmatically as a Node.js module:

```typescript
import extractCodeBlocks from "erasmus";

const markdown = `Here's the code:

\`\`\`typescript
console.log("Literate programming is cool!");
\`\`\`
`;

// This will extract the code blocks from the markdown string passed in and
// return an array of strings for further processing, e.g. joining and saving
// to a file.
const blocks = extractCodeBlocks(markdown);
```