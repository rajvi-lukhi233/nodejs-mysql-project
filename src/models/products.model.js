const { DB_NAME } = require("../utils/constant");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    DB_NAME.PRODUCT,
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
      image: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      stock: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true },
  );
  return Product;
};
