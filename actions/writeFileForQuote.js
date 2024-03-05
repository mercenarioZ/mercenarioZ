import fs from "fs"

export const writeFileForQuote = (data) => {
  fs.writeFileSync(
    "README.md",
    `## Random Quote\n\n**Quote:** ${data.text}\n\n**Author:** ${data.author}`
  );
}