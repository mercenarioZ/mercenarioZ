import fs from "fs";
import { getHighRateAnime } from "./actions/getHighRateAnime.js";

const run = async () => {
  const { title, englishTitle, score, episodeCount, rating, url } =
    await getHighRateAnime();

  if (!title || !score) return;

  console.log({ title, englishTitle, score, episodeCount, rating, url });

  fs.writeFileSync(
    "README.md",
    `## Random Anime\n\n**Title:** ${title}\n\n**English Title:** ${englishTitle}\n\n**Score:** ${score}\n\n**Episodes:** ${episodeCount}\n\n**Rating:** ${rating}\n\n**URL:** [${title}](${url})`
  );
};

run();
