import fs from "fs";

export const writeFileForAnime = (data) => {
  fs.writeFileSync(
    "README.md",
    `# Random Anime\n\n## This README is automatically updated every 8 hours using GitHub CI\n\n**Title:** ${data.title}\n\n**English Title:** ${data.englishTitle}\n\n**Score:** ${data.score}\n\n**Episodes:** ${data.episodeCount}\n\n**Rating:** ${data.rating}\n\n**URL:** [${data.title}](${data.url})`
  );
};
