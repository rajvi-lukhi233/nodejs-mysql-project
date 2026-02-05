const db = require("../models");

exports.createOrderItem = (data) => {
  return db.OrderItem.create(data);
};

exports.deleteOrderItemById = (id) => {
  return db.OrderItem.destroy({ where: { orderId: id } });
};

exports.findOrederItems = (orderId) => {
  return db.OrderItem.findAll({
    where: { orderId },
    include: [{ model: db.Product, attributes: ["name"] }],
  });
};
