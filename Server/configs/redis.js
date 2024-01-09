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

export const set = (key, value, expireInSeconds, callback) => {
  // Sử dụng SETEX để thiết lập giá trị và thời gian hết hạn
  client2.setex(key, expireInSeconds, value, (err, reply) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      console.log(`Set ${key}:`, reply);
      callback(null, reply);
    }
  });
};

export const get = (key, callback) => {
  client2.get(key, (err, reply) => {
    if (err) {
      console.error("Redis GET error:", err);
      callback(err, null);
    } else {
      console.log("Redis GET result:", reply);
      callback(null, reply);
    }
  });
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
