

const Admin = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "admin",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: "admin",
    }
  );

  return model;
};

export default Admin;
