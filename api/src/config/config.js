//api/config.js
import * as dotenv from 'dotenv';

console.log("Loading .env file...");
dotenv.config();
console.log("Loaded .env values:");
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST || 'localhost',  // используйте localhost
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    // logging: console.log,
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
      charset: 'utf8mb4',
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  },
};
