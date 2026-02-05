const { DataTypes } = require("sequelize");
const { DB_NAME, STATUS } = require("../utils/constant");

module.exports = (sequelize) => {
  const Payment = sequelize.define(
    DB_NAME.PAYMENT,
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
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      paymentStatus: {
        type: DataTypes.ENUM(...Object.values(STATUS)),
        defaultValue: STATUS.PENDING,
      },
    },
    { timestamps: true, indexes: [{ fields: ["userId", "paymentStatus"] }] },
  );
  return Payment;
};
