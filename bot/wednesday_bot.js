/**
 * 🐸 Is It Wednesday? — Daily X Bot
 * Clone of @IsWednesdayDude
 */

require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const { createClient } = require("@supabase/supabase-js");
const cron = require("node-cron");

const twitter = new TwitterApi({
  appKey:       process.env.TWITTER_API_KEY,
  appSecret:    process.env.TWITTER_API_SECRET,
  accessToken:  process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
}).readWrite;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TWEETS = {
  0: [
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 3\n\nit's sunday. wednesday feels like a myth.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 3\n\nsunday. the wednesday is not here. it never was.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 3\n\nwe don't talk about what happened last wednesday. we wait for the next one.",
  ],
  1: [
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 2\n\nmonday. this is not it. this is the opposite of it.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 2\n\nit's monday. wednesday is 2 days away. i am not okay.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 2\n\nmonday again. we persist. wednesday will come.",
  ],
  2: [
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 1\n\ntomorrow. TOMORROW. i can feel it.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 1\n\nit's tuesday. wednesday is 24 hours away. try to stay calm. i cannot.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 1\n\none more sleep. one more sleep until the day. THE day.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 1\n\ntomorrow is wednesday. i have been training for this.",
  ],
  3: [
    "Day {day} - Week {week}\nIs it Wednesday? YES.\n\nIT IS WEDNESDAY MY DUDES 🐸",
    "Day {day} - Week {week}\nIs it Wednesday? YES.\n\nIT IS WEDNESDAY MY DUDES\n\n🐸🐸🐸",
    "Day {day} - Week {week}\nIs it Wednesday? YES.\n\nIT. IS. WEDNESDAY. MY. DUDES. 🐸\n\nwe made it. we always make it.",
    "Day {day} - Week {week}\nIs it Wednesday? YES.\n\nIT IS WEDNESDAY MY DUDES 🐸\n\nthe prophecy is fulfilled. see you next week.",
  ],
  4: [
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 6\n\nit was wednesday yesterday. pour one out.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 6\n\nthursday. wednesday has left the building. 6 days of recovery begins now.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 6\n\npost-wednesday depression is real. we heal. we wait.",
  ],
  5: [
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 5\n\nit's friday. people are happy about this. i think about wednesday.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 5\n\nfriday. not wednesday. 5 days until redemption.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 5\n\nfriday is cool i guess. wednesday is cooler. 5 days.",
  ],
  6: [
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 4\n\nsaturday. halfway between last wednesday and next wednesday. this is fine.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 4\n\n4 days. the frog waits. so do we.",
    "Day {day} - Week {week}\nIs it Wednesday? No.\nDays until Wednesday: 4\n\nit's saturday. wednesday is a faint light at the end of the tunnel. 4 days.",
  ],
};

function weekNumber(dayCount) { return Math.ceil(dayCount / 7); }
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function getAndIncrementDay() {
  const { data, error } = await supabase.from("bot_counter").select("day_count").eq("id", 1).single();
  if (error || !data) {
    const { data: newRow, error: insertError } = await supabase.from("bot_counter").insert([{ id: 1, day_count: 1 }]).select().single();
    if (insertError) throw new Error("Failed to create counter: " + insertError.message);
    return newRow.day_count;
  }
  const nextDay = data.day_count + 1;
  const { error: updateError } = await supabase.from("bot_counter").update({ day_count: nextDay }).eq("id", 1);
  if (updateError) throw new Error("Failed to update counter: " + updateError.message);
  return nextDay;
}

async function postDailyTweet() {
  try {
    const dayCount = await getAndIncrementDay();
    const week = weekNumber(dayCount);
    const dayOfWeek = new Date().getDay();
    const pool = TWEETS[dayOfWeek];
    const template = pickRandom(pool);
    const tweet = template.replace("{day}", dayCount).replace("{week}", week);
    const { data } = await twitter.v2.tweet(tweet);
    console.log(`✅ [${new Date().toISOString()}] Posted (id: ${data.id}):\n${tweet}\n`);
  } catch (err) {
    console.error("❌ Error:", JSON.stringify(err?.data ?? err?.message ?? err, null, 2));
  }
}

cron.schedule("0 9 * * *", () => {
  console.log("⏰ Cron fired — posting tweet...");
  postDailyTweet();
}, { timezone: "UTC" });

console.log("🐸 Wednesday Bot running. Fires daily at 09:00 UTC.");

// Uncomment to test immediately on startup:
// postDailyTweet();
