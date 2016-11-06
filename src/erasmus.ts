import { Transform, TransformOptions } from 'stream';

export type CodeBlocks = string[];

/**
 * Extracts code blocks from a Markdown document.
 */
export function extractCode(markdown: string): CodeBlocks {
    const regex = /^`{3}\w*$/gmu;

    return markdown
        .split(regex)
        /* After splitting the markdown content at each occurrence of a code block fence
        (```[language]), every second element of the resulting array contains a chunk of code. */
        .filter((_, index) => index % 2 > 0)
        .map((item) => item.trim());
}

/**
 * Transform stream extracting code blocks from a readable stream of Markdown text.
 */
export class CodeExtractor extends Transform {
    private markdown: string;

    constructor(options: TransformOptions) {
        super(options);
        this.markdown = ``;
    }

    _transform(chunk: string, _: string, callback: Function): void {
        this.markdown += chunk;
        callback();
    }

    _flush(callback: Function): void {
        this.push(`${extractCode(this.markdown).join(`\n`)}\n`);
        callback();
    }
}
