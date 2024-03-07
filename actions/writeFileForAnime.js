import fs from "fs";

export const writeFileForAnime = (data) => {
  fs.writeFileSync(
    "README.md",

    `
<img src="svg/nai.svg" />

<p>
  <h2>Tools</h2>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,dotnet,mongodb,express,react,nodejs,bootstrap,tailwind,laravel" />
  </a>

  <br />

  <h2>Programming Languages</h2>

  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=javascript,typescript,html,css,cs,php" />
  </a>
</p>

<br />

<h2 align="center">There's always a good anime to watch every day 😀</h2>
<h3><i>Good random anime</i></h3>

<blockquote>
<i>
<q>These information about a random anime will be automatically updated every 8 hours. Enjoy!</q> - GitHub Actions
</i>
</blockquote>

<h4>
  <strong>🥭 <u>Title:</u></strong> ${data.title}
</h4>

<h4>🌿 <u>English Title:</u> ${data.englishTitle}</h4>

<img align="right" width="165" src=${data.imageSrc} />

<h4>🌱 Score: ${data.score}</h4>

<h4>🌲 Type: ${data.type}</h4>

<h4>🌴 Aired: ${data.startDate}</h4>

<h4>🌵 Genres: ${data.genres}</h4>

<h4>🥑 Episodes: ${data.episodeCount}</h4>

<h4>🍏 Rating: ${data.rating}</h4>

<h4>🍂 More information: [${data.title}](${data.url})</h4>
    `
  );
};
