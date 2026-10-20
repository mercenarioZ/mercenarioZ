const ANILIST_URL = "https://graphql.anilist.co";
const MIN_SCORE = 75; // AniList scores are integers from 0 to 100
const MAX_ATTEMPTS = 3;
const PAGE_SIZE = 50;
const MAX_PAGE = 5;

const FORMAT_LABELS = {
  TV: "TV",
  TV_SHORT: "TV Short",
  MOVIE: "Movie",
  SPECIAL: "Special",
  OVA: "OVA",
  ONA: "ONA",
  MUSIC: "Music"
};

const RANDOM_HIGH_RATED_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
        title {
          romaji
          english
          native
        }
        averageScore
        episodes
        format
        genres
        siteUrl
        coverImage {
          large
        }
        startDate {
          year
        }
      }
    }
  }
`;

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const pickRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const pickRandomPage = () => 1 + Math.floor(Math.random() * MAX_PAGE);

const formatAnime = (anime) => ({
  title:
    anime.title?.romaji || anime.title?.english || anime.title?.native || "",
  englishTitle: anime.title?.english || "N/A",
  score: (anime.averageScore / 10).toFixed(1),
  episodeCount:
    anime.episodes == null
      ? "Unknown"
      : anime.episodes > 100
        ? "More than 100"
        : anime.episodes,
  url: anime.siteUrl,
  type: anime.format ? FORMAT_LABELS[anime.format] || anime.format : "Unknown",
  startDate: anime.startDate?.year || "Unknown",
  genres: anime.genres?.length ? anime.genres.join(", ") : "Unknown",
  imageSrc: anime.coverImage?.large || ""
});

export const getHighRateAnime = async () => {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(ANILIST_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: RANDOM_HIGH_RATED_ANIME_QUERY,
          variables: { page: pickRandomPage(), perPage: PAGE_SIZE }
        }),
        signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const body = await response.json();

      if (body.errors?.length) {
        throw new Error(body.errors.map((error) => error.message).join("; "));
      }

      const candidates = (body.data?.Page?.media || []).filter(
        (anime) =>
          anime.title &&
          anime.siteUrl &&
          anime.averageScore >= MIN_SCORE
      );

      if (candidates.length === 0) {
        throw new Error(`No anime found with a score above ${MIN_SCORE}/100`);
      }

      return formatAnime(pickRandomItem(candidates));
    } catch (error) {
      const message = error.message;

      if (attempt === MAX_ATTEMPTS) {
        throw new Error(`Unable to fetch anime from AniList: ${message}`);
      }

      console.warn(
        `Anime fetch attempt ${attempt} failed: ${message}. Retrying...`
      );
      await wait(attempt * 1500);
    }
  }
};
