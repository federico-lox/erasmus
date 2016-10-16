import * as fs from "fs";

// The module is being invoked directly
if (require.main === module) {
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
            blocks = findCodeBlocks(content),
            code = mergeCodeBlocks(blocks, "\n\n");

        console.log(code);
    } else {
        console.log("Usage: erasmus FILE [> OUT]");
    }
}

export function findCodeBlocks(content: string): string[] {
    const regex = /^`{3}\w*$/gmu;

    return content
        .split(regex)
        .filter((_, index) => index % 2 > 0)
        .map((item) => item.trim());
}

export function mergeCodeBlocks(blocks: string[], separator: string = "\n"): string {
    return blocks.join(separator);
}