import fs from "fs";

export const writeFileForAnime = (data) => {
  fs.writeFileSync(
    "README.md",

    `
<img src="svg/nai.svg" />

<br />

<h3>Hi, my name is <strong>Le Ba Nguyen Vu</strong>.</h3>
 📬 E-mail: \`vunainguyen2002@gmail.com\` \`funnystar320@gmail.com\`


<h3>Socials</h3>
<a target="_blank" href="https://instagram.com/vu.le1352"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" /></a>

<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,dotnet,mongodb,express,react,tailwind,spring,docker&theme=dark" />
  </a>
  <br />
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=javascript,typescript,html,css,cs,php&theme=dark" />
  </a>
</p>

<br />

<h2 align="center">There's always a good anime to watch every day 😀</h2>

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
    `
  );
};
