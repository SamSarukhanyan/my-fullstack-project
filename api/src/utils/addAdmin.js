import bcryptjs from 'bcryptjs';
import db from '../models/index.js'; // Путь к вашему файлу с моделью Admin

const addAdmin = async () => {
  const plainPassword = 'davit123';
  const hashedPassword = await bcryptjs.hash(plainPassword, 10); // Хеширование пароля с силой хеширования 10

  try {
    // Создание администратора с хешированным паролем с помощью модели Sequelize
    const admin = await db.Admin.create({
      username: 'Davit',
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('Admin added:', admin.toJSON());
    return admin;
  } catch (error) {
    console.error('Error adding admin:', error);
    throw error;
  }
};

export default addAdmin;
