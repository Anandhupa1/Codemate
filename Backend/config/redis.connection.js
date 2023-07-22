// const redis = require('redis');

// const redisClient = redis.createClient({
//     host: process.env.REDIS_ENDPOINT,
//     port: process.env.REDIS_PORT,
//     // password: "your-redis-auth-password",
   
//   });

//   redisClient.on('connect', () => {
//     console.log('Connected to Redis');
//   });
  
//   redisClient.on('error', (err) => {
//     console.error('Redis connection error:', err);
//   });
  
// module.exports = {redisClient};