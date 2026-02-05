const db = require("../models");

exports.create = (data) => {
  return db.Payment.create(data);
};

exports.updatePayment = (data, where) => {
  return db.Payment.update(data, { where });
};

exports.findPayment = (where, attributes) => {
  return db.Payment.findOne({ where, attributes });
};

exports.paymentList = () => {
  return db.Payment.findAll({
    attributes: ["id", "amount", "paymentStatus", "orderId", "userId"],
    include: [
      {
        model: db.User,
        attributes: ["name"], // userName
      },
      {
        model: db.Order,
        attributes: ["id"],
        include: [
          {
            model: db.OrderItem,
            attributes: ["productId", "quantity"],
            include: [
              {
                model: db.Product,
                attributes: ["name", "price"],
              },
            ],
          },
        ],
      },
    ],
  });
};
