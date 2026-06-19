import { getHighRateAnime } from "./actions/getHighRateAnime.js";
import { writeFileForAnime } from "./actions/writeFileForAnime.js";

const run = async () => {
  const anime = await getHighRateAnime();
  const {
    title,
    englishTitle,
    score,
    episodeCount,
    rating,
    url,
    type,
    startDate,
    genres,
    imageSrc
  } = anime;

  if (!title || !score) {
    throw new Error("Anime fetch completed without a title or score");
  }

  console.log({
    title,
    englishTitle,
    score,
    episodeCount,
    rating,
    url,
    type,
    startDate,
    genres,
    imageSrc
  });

  const formattedScore = `${score}/10`;

  writeFileForAnime({
    title,
    englishTitle,
    score: formattedScore,
    episodeCount,
    rating,
    url,
    type,
    startDate,
    genres,
    imageSrc
  });
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
