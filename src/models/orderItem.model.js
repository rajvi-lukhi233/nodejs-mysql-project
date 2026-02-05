const { DataTypes } = require("sequelize");
const { DB_NAME } = require("../utils/constant");

module.exports = (sequelize) => {
  const OrderItem = sequelize.define(
    DB_NAME.ORDER_ITEM,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    { timestamps: true },
  );

  return OrderItem;
};
