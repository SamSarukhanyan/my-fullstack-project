const Property = (sequelize, DataTypes) => {
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
        type: DataTypes.STRING,
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
    },
    {
      timestamps: false,
    }
  );

  return model;
};

export default Property;
