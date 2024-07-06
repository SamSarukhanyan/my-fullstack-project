import Sequelize from "sequelize";
import configs from "../config/config.js"; // Импорт конфигурации
import Admin from "./Admin.js";
import Property from "./Property.js";

const env = process.env.NODE_ENV || "development";
const config = configs[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    dialectOptions: {
      connectTimeout: 60000, // Увеличение времени ожидания
      charset: 'utf8mb4',
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  }
);

// Admin
db[Admin.name] = Admin(sequelize, Sequelize);
db[Property.name] = Property(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
