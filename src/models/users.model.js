const { DataTypes } = require("sequelize");
const { DB_NAME, ROLE } = require("../utils/constant");

module.exports = (sequelize) => {
  const User = sequelize.define(
    DB_NAME.USER,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(ROLE)),
        defaultValue: ROLE.USER,
      },
      otpCode: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      otpExpiredAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      resetPassToken: {
        type: DataTypes.STRING,
        default: null,
      },
      resetPassTokenExpiredAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          fields: ["deletedAt"],
        },
      ],
    },
  );
  return User;
};
