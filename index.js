import axios from "axios";
import fs from "fs";

const getQuote = async () => {
  try {
    const { data } = await axios.get("https://api.hamatim.com/quote");

    const { text, author } = data;

    return { text, author };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const run = async () => {
  const { text, author } = await getQuote();

  if (!text || !author) return;

  console.log({ text, author });

  fs.writeFileSync(
    "README.md",
    `# Quote of the day\n\n_**${text}**_\n\n${author}`
  );
};

run();
