const { fn, col } = require("sequelize");
const db = require("../models");
const { DB_NAME, ROLE } = require("../utils/constant");

exports.createOrder = (data) => {
  return db.Order.create(data);
};

exports.findAllOrders = (userId, role) => {
  const where = {};
  if (role == ROLE.USER) {
    where.userId = userId;
  }
  return db.Order.findAll({
    where,
    include: [
      {
        model: db.User,
        attributes: ["id", "name"],
      },
      {
        model: db.OrderItem,
        attributes: ["quantity", "price"],
        include: [
          {
            model: db.Product,
            attributes: ["id", "name", "price", "image"],
          },
        ],
      },
    ],
  });
};

exports.findOrderById = (id) => {
  return db.Order.findByPk(id, {
    include: [
      {
        model: db.OrderItem,
        include: [
          {
            model: db.Product,
            attributes: ["id", "name", "price"],
          },
        ],
      },
    ],
  });
};

exports.findOrder = (where, attributes) => {
  return db.Order.findOne({ where, attributes });
};

exports.updateById = (data, where) => {
  return db.Order.update(data, { where });
};

exports.deleteById = (id) => {
  return db.Order.destroy(id);
};

exports.findOrderByUser = () => {
  return db.Order.findAll({
    attributes: ["userId", [fn("COUNT", col("Orders.id")), "totalOrders"]],
    include: [
      {
        model: db.User,
        attributes: ["name"],
      },
    ],
    group: ["userId"],
  });
};
