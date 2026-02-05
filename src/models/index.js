const { sequelize } = require("../../config/dbConfig");
const UserModel = require("./users.model");
const ProductModel = require("./products.model");
const OrderModel = require("./orders.model");
const OrderItemModel = require("./orderItem.model");
const PaymentModel = require("./payments.model");

const db = {};

db.User = UserModel(sequelize);
db.Order = OrderModel(sequelize);
db.Product = ProductModel(sequelize);
db.OrderItem = OrderItemModel(sequelize);
db.Payment = PaymentModel(sequelize);

db.User.hasMany(db.Order, { foreignKey: "userId" });
db.User.hasMany(db.Payment, { foreignKey: "userId" });
db.Order.belongsTo(db.User, { foreignKey: "userId" });

db.Order.hasMany(db.OrderItem, { foreignKey: "orderId" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });

db.Product.hasMany(db.OrderItem, { foreignKey: "productId" });
db.OrderItem.belongsTo(db.Product, { foreignKey: "productId" });

db.Payment.belongsTo(db.Order, { foreignKey: "orderId" });
db.Payment.belongsTo(db.User, { foreignKey: "userId" });

db.sequelize = sequelize;
module.exports = db;
