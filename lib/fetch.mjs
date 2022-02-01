import fetch from "node-fetch";
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config({ path: "./test.env" });

// OAuth 1.0a (User context)
// const client = new TwitterApi({
//   appKey: process.env.appKey,
//   appSecret: process.env.appSecret,
//   accessToken: process.env.accessToken,
//   accessSecret: process.env.accessSecret,
// });

// We need to review if requiere other key because this client don't have permissions
// OAuth2 (app-only or user context)
const consumerClient = new TwitterApi({
  appKey: process.env.appKey,
  appSecret: process.env.appSecret,
});

// const consumerClient = new TwitterApi(MY_BEARER_TOKEN);

const client = await consumerClient.appLogin();

async function authenticateClient() {
  //the consumer key 'RFC 1738 encoded'
  const rfcKey = encodeURI(process.env.appKey);

  //the consumer secret 'RFC 1738 encoded'
  const rfcSecret = encodeURI(process.env.appSecret);

  //make the bearer token credential string -
  //the rfc encoded key : the rfc encoded secret
  const bearerTokenCredentials = `${rfcKey}:${rfcSecret}`;

  const base64BearerTokenCredentials = Buffer.from(
    bearerTokenCredentials
  ).toString("base64");

  const options = {
    headers: {
      accept: "gzip",

      Authorization: "Basic " + base64BearerTokenCredentials,

      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: "grant_type=client_credentials",
  };

  const response = await fetch(
    "https://api.twitter.com/oauth2/token",
    options
  ).catch((error) => console.error("Auth Error", error));
  const bearerToken = await response.json();
  return bearerToken.access_token;
}

async function getDataTwitterByQuery(query_twt) {
  try {
    if (query_twt?.mention) {
      return await getUserTimeline(query_twt?.mention);
    }
    if (query_twt?.hashtag || query_twt?.location) {
      return await getTrendsBylocation(query_twt?.hashtag, query_twt?.location);
    }

    return false;
  } catch (error) {}
}

async function getTrendsBylocation(hashtag, country) {
  console.info("getTrendsBylocation");
  let trend = null;
  console.log("country", country);
  try {
    const currentTrends = await client.v1
      .trendsAvailable()
      .then(
        (res) =>
          res.find(
            (value) => value.name.toUpperCase() === country.toUpperCase()
          ).woeid
      );

    if (currentTrends) {
      const trendsByCountry = await client.v1
        .trendsByPlace(currentTrends)
        .then((res) => res[0].trends.find((trend) => trend.name === hashtag));

      console.log("trendsByCountry", trendsByCountry);
    }

    //   for (const { trends } of trendsByCountry) {
    //     // console.log("Trends", trends);
    //     trend = trends.find((value) => country === value.name);
    //     return trend;
    //   }
    //   console.log(trend);
    // }
    throw "Not found woeid!";
  } catch (error) {
    console.error("Error get data by location", error);
  }
}

async function getUserTimeline(param) {
  console.log("returning data user", param);
  const users = param.split(",");
  try {
    const promises = users.map((value) =>
      client.v1.userTimelineByUsername(value, {
        include_entities: true,
        count: 10,
      })
    );
    const fetchedTweets = await Promise.all(promises).then();

    const tweets = fetchedTweets.map((value, index) => {
      return {
        name: users[index],
        tweets: value.tweets,
      };
    });
    return tweets;
  } catch (error) {
    console.error("Error getUserTimeline", error);
  }
}

export { authenticateClient, getDataTwitterByQuery };
