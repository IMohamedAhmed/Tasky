const redis = require("redis");

const client = redis.createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    },
});

client.on("connect", () => console.log("Redis connected"));
client.on("error", (err) => console.error("Redis Client Error", err));

// Connect
(async () => {
    await client.connect();
})();

module.exports = client;
