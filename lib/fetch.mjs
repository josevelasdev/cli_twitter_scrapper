import fetch from "node-fetch";
import { TwitterApi } from "twitter-api-v2";
import  dotenv  from "dotenv";

dotenv.config({ path: './TEST.env' });

const client = new TwitterApi({
  appKey: process.env.appKey,
  appSecret: process.env.appSecret,
  accessToken: process.env.accessToken,
  accessSecret: process.env.accessSecret,
});


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

  const response = await fetch("https://api.twitter.com/oauth2/token", options).catch( error => console.error('Auth Error', error));
  const bearerToken = await response.json();
  return bearerToken.access_token;
}

async function getDataTwitterByQuery(query_twt) {
  try {
    if(query_twt?.mention ) {
      return await getUserTimeline(query_twt?.mention);
    }

    if(query_twt?.location) {
      return await getTrendsBylocation(query_twt?.location);
    }

    
  } catch (error) {
    console.error(error);
  }
}

async function getTrendsBylocation(param) {
  try {
    const currentTrends = await client.v1.trendsAvailable();
    const filterTrends = currentTrends.filter((value) => value.name === param);
    const trendsByCountry = await client.v1.trendsByPlace(filterTrends[0].woeid)
    for (const { trends, created_at } of trendsByCountry) {
        for (const trend of trends) {
          console.log("Trend", trend);
        }
      }
  } catch (error) {
    console.error('Error get data by location', error);
  }
 
}

async function getUserTimeline(param) {
  try {
    const userTimeline = await client.v1.userTimelineByUsername(param, {
      count: 1,
    });
    const fetchedTweets = userTimeline.tweets;
    return fetchedTweets;
  } catch (error) {
    console.error('Error getUserTimeline', error);
  }
}

export { authenticateClient, getDataTwitterByQuery };
