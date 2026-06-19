const TOP_ANIME_URL = "https://api.jikan.moe/v4/top/anime";
const MIN_SCORE = 7.5;
const MAX_ATTEMPTS = 3;
const TOP_PAGE = 1;

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const pickRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const formatAnime = (anime) => ({
  title: anime.title,
  englishTitle: anime.title_english || "N/A",
  score: anime.score,
  episodeCount:
    anime.episodes == null
      ? "Unknown"
      : anime.episodes > 100
        ? "More than 100"
        : anime.episodes,
  rating: anime.rating || "Unknown",
  url: anime.url,
  type: anime.type || "Unknown",
  startDate: anime.aired?.prop?.from?.year || "Unknown",
  genres: anime.genres?.map((genre) => genre.name).join(", ") || "Unknown",
  imageSrc: anime.images?.jpg?.image_url || ""
});

export const getHighRateAnime = async () => {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const params = new URLSearchParams({
        page: String(TOP_PAGE),
        sfw: "true"
      });
      const response = await fetch(`${TOP_ANIME_URL}?${params}`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const candidates = (data.data || []).filter(
        (anime) => anime.title && anime.url && anime.score >= MIN_SCORE
      );

      if (candidates.length === 0) {
        throw new Error(`No anime found with a score above ${MIN_SCORE}`);
      }

      return formatAnime(pickRandomItem(candidates));
    } catch (error) {
      const message = error.message;

      if (attempt === MAX_ATTEMPTS) {
        throw new Error(`Unable to fetch anime from Jikan: ${message}`);
      }

      console.warn(
        `Anime fetch attempt ${attempt} failed: ${message}. Retrying...`
      );
      await wait(attempt * 1500);
    }
  }
};
