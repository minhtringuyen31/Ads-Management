import redis from "redis";
import ioredis from "ioredis";
const redisServerIP = "14.225.192.121";
const redisServerPort = 6379;
const username = "alice";
const password = "123456";
const url = `redis://alice:123456@14.225.192.121:6379`;
console.log(url);

const client2 = new ioredis({
  host: redisServerIP,
  port: redisServerPort,
  username: username,
  password: password,
});

client2.on("connect", () => {
  console.log("Connected to Redis");
});
client2.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export const set = async (key, value, expireInSeconds) => {
  try {
    const reply = await client2.setex(key, expireInSeconds, value);
    console.log(`Set ${key}:`, reply);
    return reply;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const get = async (key) => {
  try {
    const reply = await client2.get(key);
    console.log(`Get ${key}:`, reply);
    return reply;
  } catch (err) {
    console.error("Redis GET error:", err);
    throw err;
  }
};

export const del = async (key) => {
  try {
    const reply = await client2.del(key);
    console.log(`Delete ${key}:`, reply);
    return reply;
  } catch (err) {
    console.error("Redis DELETE error:", err);
    throw err;
  }
};

// const client = redis.createClient({
//   url: url,
//   //   username: "alice",
//   //   password: password,
//   //   socket: {
//   //     host: redisServerIP,
//   //     port: redisServerPort,
//   //     tls: true,
//   //   },
// });
// client.connect();
// client.on("connect", () => {
//   console.log("Connected to Redis");
// });
// client.on("error", (err) => {
//   console.error("Redis connection error:", err);
// });

// export const set = (key, value, callback) => {
//   client.set(key, value, (err, reply) => {
//     if (err) {
//       console.error(err);
//       callback(err, null);
//     } else {
//       console.log(`Set ${key}:`, reply);
//       callback(null, reply);
//     }
//   });
// };

// export const get = (key, callback) => {
//   client.get(key, (err, reply) => {
//     if (err) {
//       console.error("Redis GET error:", err);
//       callback(err, null);
//     } else {
//       console.log("Redis GET result:", reply);
//       callback(null, reply);
//     }
//   });
// };
export default client2;
