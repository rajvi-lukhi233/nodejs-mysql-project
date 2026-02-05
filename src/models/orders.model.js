const { DataTypes } = require("sequelize");
const { DB_NAME, STATUS } = require("../utils/constant");

module.exports = (sequelize) => {
  const Order = sequelize.define(
    DB_NAME.ORDER,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      orderStatus: {
        type: DataTypes.ENUM(...Object.values(STATUS)),
        defaultValue: STATUS.PENDING,
      },
    },
    { timestamps: true, indexes: [{ fields: ["orderStatus"] }] },
  );
  return Order;
};
