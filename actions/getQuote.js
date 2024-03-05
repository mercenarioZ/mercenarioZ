import axios from "axios";

export const getQuote = async () => {
  try {
    const { data } = await axios.get("https://api.hamatim.com/quote");

    const { text, author } = data;

    return { text, author };
  } catch (error) {
    console.log(error);
    return {};
  }
};
