import fs from "fs";

export const writeFileForAnime = (data) => {
  fs.writeFileSync(
    "README.md",
    `# Random Anime\n\n**Title:** ${data.title}\n\n**English Title:** ${data.englishTitle}\n\n**Score:** ${data.score}\n\n**Episodes:** ${data.episodeCount}\n\n**Rating:** ${data.rating}\n\n**URL:** [${data.title}](${data.url})`
  );
};
