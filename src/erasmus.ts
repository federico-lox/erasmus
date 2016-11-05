#!/usr/bin/env node

import * as fs from "fs";

// The module is being invoked directly
if (require.main === module) {
    //TODO: read from stdin instead
    //see https://github.com/sindresorhus/get-stdin/blob/master/index.js#L7
    const file = process.argv[2];

    if (file != undefined && file.length > 0) {
        let content = "";

        try {
            content = fs.readFileSync(file, "utf-8");
        } catch (e) {
            console.error(e);
            process.exit(-1);
        }

        const
            blocks = extractCodeBlocks(content),
            code = mergeCodeBlocks(blocks, "\n\n");

        console.log(code);
    } else {
        console.log("Usage: erasmus FILE [> OUT]");
    }
}

export default function extractCodeBlocks(markdown: string): string[] {
    const regex = /^`{3}\w*$/gmu;

    return markdown
        .split(regex)
        // After splitting the markdown content at each occurrence of a code
        // block fence (```[language]), every second element of the resulting
        // array contains a chunk of code.
        .filter((_, index) => index % 2 > 0)
        .map((item) => item.trim());
}

function mergeCodeBlocks(blocks: string[], separator: string = "\n"): string {
    return blocks.join(separator);
}