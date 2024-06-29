import * as dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log // Включает логирование запросов
  },
  // Добавьте конфигурации для других окружений (production, test и т.д.) при необходимости
};
