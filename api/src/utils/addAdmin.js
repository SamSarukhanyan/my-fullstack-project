import bcryptjs from 'bcryptjs';
import db from '../models/index.js'; 

const addAdmin = async () => {
  const plainPassword = 'davit123';
  const hashedPassword = await bcryptjs.hash(plainPassword, 10); 

  try {

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
