import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();  // Загружаем переменные окружения из .env

console.log('Тестирование подключения к базе данных');

// Проверка значений переменных окружения
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно!');
  } catch (error) {
    console.error('Ошибка при подключении:', error);
  }
})();
