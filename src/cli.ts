#!/usr/bin/env node

import { basename } from 'path';
import {
    createReadStream as stream,
    existsSync as exists,
    statSync as info
} from 'fs';
import { CodeExtractor } from './erasmus';

function exit(error: string | Error | undefined): void {
    let code: number;

    if (error) {
        code = -1;
        console.error(error instanceof Error ? error.message : error);
    } else {
        code = 0;
    }

    process.exit(code);
}

// The module is not being invoked directly
if (require.main !== module) {
    console.error(`${basename(__filename)} can only be invoked as a command.`);
    process.exit(-1);
}

const encoding = `utf8`;
const output = process.stdout;
const [, , option] = process.argv;

let input: NodeJS.ReadableStream | undefined = undefined;
let message: string = `Could not continue.`;

switch (option) {
    case undefined:
    case `-h`:
    case `--help`:
        message = `Usage: erasmus FILE`;
        break;

    case `-p`:
    case `--pipe`:
        input = process.stdin;
        break;

    default:
        if (exists(option) && info(option).isFile()) {
            input = stream(option);
        } else {
            message = `Could not open ${option}.`;
        }
}

if (input == undefined) {
    exit(message);
} else {
    const extractor = new CodeExtractor({ encoding: `utf-8` });

    input.on(`error`, exit);
    input.setEncoding(encoding);
    input.pipe(extractor).pipe(output);
}
