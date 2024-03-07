import axios from "axios";

export const getHighRateAnime = async () => {
  let title = "";
  let englishTitle = "";
  let score = 0;
  let episodeCount;
  let rating = "";
  let url = "";
  let type = "";
  let startDate;
  let genres;
  let imageSrc;

  do {
    try {
      const { data } = await axios.get("https://api.jikan.moe/v4/random/anime");

      score = data.data.score;
      title = data.data.title;
      englishTitle = data.data.title_english;
      episodeCount =
        data.data.episodes > 100 ? "More than 100" : data.data.episodes;
      rating = data.data.rating;
      url = data.data.url;
      type = data.data.type;
      startDate = data.data.aired.prop.from.year;
      genres = data.data.genres.map((genre) => genre.name).join(", ");
      imageSrc = data.data.images.jpg.image_url;
    } catch (error) {
      // console.log("Something went wrong with the request");
      return {};
    }
  } while (score <= 7.48);
  // console.log("High rated anime found!");

  return {
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
  };
};
