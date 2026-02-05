const db = require("../models");

exports.createProduct = (data) => {
  return db.Product.create(data);
};

exports.updateProductById = (data, id) => {
  return db.Product.update(data, { where: { id } });
};

exports.findProductById = (id) => {
  return db.Product.findByPk(id);
};

exports.deleteById = (id) => {
  return db.Product.destroy({ where: { id } });
};

exports.findAll = (where, limit = 10, page = 1) => {
  return db.Product.findAll({ where, limit, offset: (page - 1) * limit });
};
