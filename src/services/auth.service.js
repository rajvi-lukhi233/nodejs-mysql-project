const db = require("../models");

exports.findOne = (where, attributes) => {
  return db.User.findOne({ where, attributes });
};
exports.createUser = (data) => {
  return db.User.create(data);
};
exports.updateUserById = (data, id) => {
  return db.User.update(data, { where: { id } });
};

exports.findUserById = (id, attributes) => {
  return db.User.findByPk(id, { attributes });
};
