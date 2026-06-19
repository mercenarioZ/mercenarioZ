import fs from "fs";

const README_PATH = "README.md";
const ANIME_SECTION_HEADING =
  '<h2 align="center">There\'s always a good anime to watch every day 😀</h2>';

const getReadmeIntro = () => {
  if (!fs.existsSync(README_PATH)) return "";

  const readme = fs.readFileSync(README_PATH, "utf8");
  const animeSectionIndex = readme.indexOf(ANIME_SECTION_HEADING);

  if (animeSectionIndex === -1) return readme.trimEnd();

  return readme.slice(0, animeSectionIndex).trimEnd();
};

const buildAnimeSection = (data) => `${ANIME_SECTION_HEADING}

<blockquote>
<i>
<q>These information about a random anime will be automatically updated every week. Hope you enjoy!</q> - GitHub Actions
</i>
</blockquote>

<h4>
  <strong>🥭 <u>Title:</u></strong> ${data.title}
</h4>

<h4>🌿 <u>English Title:</u> ${data.englishTitle}</h4>

<img align="right" width="170" src=${data.imageSrc} />

<h4>🌱 Score: ${data.score}</h4>

<h4>🌲 Type: ${data.type}</h4>

<h4>🌴 Aired: ${data.startDate}</h4>

<h4>🌵 Genres: ${data.genres}</h4>

<h4>🥑 Episodes: ${data.episodeCount}</h4>

<h4>🍏 Rating: ${data.rating}</h4>

<br />

🍂 *More information: [${data.title}](${data.url})*
`;

export const writeFileForAnime = (data) => {
  const intro = getReadmeIntro();
  const animeSection = buildAnimeSection(data);

  fs.writeFileSync(README_PATH, `${intro}\n\n${animeSection}\n`);
};
