import { getHighRateAnime } from "./actions/getHighRateAnime.js";
import { writeFileForAnime } from "./actions/writeFileForAnime.js";

const run = async () => {
  const { title, englishTitle, score, episodeCount, rating, url } =
    await getHighRateAnime();

  if (!title || !score) return;

  console.log({ title, englishTitle, score, episodeCount, rating, url });

  const formattedScore = `${score}/10`

  writeFileForAnime({ title, englishTitle, score: formattedScore, episodeCount, rating, url })
};

run();
