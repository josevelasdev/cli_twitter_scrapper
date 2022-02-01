import fs from "fs";
import { parse } from "json2csv";

function getCurrentDirectoryBase() {
  return path.basename(process.cwd());
}

function directoryExists(filePath) {
  return fs.existsSync(filePath);
}

function createCSV(response, title = "result") {
  createColumnsCSV(response, title);
}
function createColumnsCSV(response, title = "result") {
  const fieldsUser = [
    "id",
    "name",
    "screen_name",
    "location",
    "verified",
    "followers_count",
  ];

  const fieldsTweets = [
    "created_at",
    "id",
    "full_text",
    "source",
    "in_reply_to_screen_name",
    "in_reply_to_user_id",
    "hashtags",
    "symbols",
    "user_mentions",
  ];
  const optsUser = { fieldsUser };
  const optsTweets = { fieldsTweets };
  if (response) {
    response.forEach((value) => {
      const dataTweets = [];
      const user = {};

      for (const tweet of value.tweets) {
        if (Object.keys(user).length === 0) {
          Object.assign(user, tweet.user);
        }
        dataTweets.push({
          created_at: tweet.created_at,
          id: tweet.id,
          full_text: tweet.full_text,
          source: tweet.source,
          in_reply_to_screen_name: tweet.in_reply_to_screen_name,
          in_reply_to_user_id: tweet.in_reply_to_user_id,
          hashtags: tweet.entities.hashtags,
          symbols: tweet.entities.symbols,
          user_mentions: tweet.entities.user_mentions,
        });
      }
      const csvUser = parse(user, optsUser);
      const csvTweetsByUser = parse(dataTweets, optsTweets);
      fs.writeFile(`${value.name}_user.csv`, csvUser, { flag: "a+" }, (err) => {
        if (err) console.error("error create file", err);
      });
      fs.writeFile(
        `${value.name}_tweets.csv`,
        csvTweetsByUser,
        { flag: "a+" },
        (err) => {
          if (err) console.error("error create file", err);
        }
      );
    });
  }
}

export { getCurrentDirectoryBase, directoryExists, createCSV };

// promisesFile.push(
//   fs.writeFile(`${title}.csv`, csv, { flag: "a+" }, (err) => {})
// );
