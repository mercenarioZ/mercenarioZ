import fs from "fs";

export const writeFileForAnime = (data) => {
  fs.writeFileSync(
    "README.md",

    `# Random anime every 8 hours\n\n**Title:** ${data.title}\n\n**English Title:** ${data.englishTitle}\n\n**Score:** ${data.score}\n\n**Type:** ${data.type}\n\n**Aired: ${data.startDate}\n\n**Genres: ${data.genres}\n\n**Episodes:** ${data.episodeCount}\n\n**Rating:** ${data.rating}\n\n**More information:** [${data.title}](${data.url})`
  );
};
