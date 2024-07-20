import { DataTypes } from "sequelize";
import moment from "moment-timezone";

const Property = (sequelize) => {
  const model = sequelize.define(
    "Property",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uniqueFields: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rentalPeriod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      info: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photos: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      contactInfo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      propertyStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "standard",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          const now = moment.tz('Asia/Yerevan').format('YYYY-MM-DD HH:mm:ss');
          instance.createdAt = now;
          instance.updatedAt = now;
        },
        beforeUpdate: (instance, options) => {
          instance.updatedAt = moment.tz('Asia/Yerevan').format('YYYY-MM-DD HH:mm:ss');
        }
      }
    }
  );

  return model;
};

export default Property;
