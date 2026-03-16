require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

console.log("Keys loaded:");
console.log("API_KEY:", process.env.TWITTER_API_KEY?.slice(0,5) + "...");
console.log("API_SECRET:", process.env.TWITTER_API_SECRET?.slice(0,5) + "...");
console.log("ACCESS_TOKEN:", process.env.TWITTER_ACCESS_TOKEN?.slice(0,5) + "...");
console.log("ACCESS_SECRET:", process.env.TWITTER_ACCESS_SECRET?.slice(0,5) + "...");

client.v2.tweet("test tweet 🐸")
  .then(result => console.log("✅ Success!", result.data))
  .catch(err => console.error("❌ Error:", JSON.stringify(err?.data || err?.message || err, null, 2)));
