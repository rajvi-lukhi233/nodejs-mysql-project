const {
  findAllOrders,
  updateById,
  findOrderById,
  findOrderByUser,
  createOrder,
  findOrder,
  deleteOrderById,
} = require("../services/order.service");
const {
  createOrderItem,
  deleteOrderItemById,
} = require("../services/orderItem.service");
const { findProductById } = require("../services/product.service");
const { logger } = require("../utils/logger");
const { errorResponse, successResponse } = require("../utils/resUtil");

exports.getAllOrders = async (req, res) => {
  try {
    logger.info("Orderes fatched.");
    const { userId, role } = req.user;
    const orders = await findAllOrders(userId, role);
    if (!orders) {
      return errorResponse(res, 404, "Orders not found.");
    }
    return successResponse(
      res,
      200,
      "Orders list retrive successfully.",
      orders,
    );
  } catch (error) {
    logger.error(`getAllOrders API Error:${error.message}`);
    return errorResponse(res, 500, "Internal server error.");
  }
};

exports.craeteOrder = async (req, res) => {
  try {
    logger.info("Ordere created.");
    const { products, city, state, country, zipCode, address } = req.body;
    const { userId } = req.user;
    let totalAmount = 0;
    for (item of products) {
      const product = await findProductById(item.productId);
      if (!product) {
        return errorResponse(
          res,
          404,
          `This product is not found:${item.productId}`,
        );
      }
      totalAmount += product.price * (item.quantity || 1);
    }
    const order = await createOrder({
      userId,
      city,
      state,
      country,
      zipCode,
      address,
      totalAmount,
    });
    for (const p of products) {
      const product = await findProductById(p.productId);
      await createOrderItem({
        orderId: order.id,
        productId: product.id,
        quantity: p.quantity || 1,
        price: product.price,
      });
    }
    if (order) {
      return successResponse(res, 201, "Order created successfully.", order);
    }
    return errorResponse(res, 400, "Order not created.");
  } catch (error) {
    logger.error(`craeteOrder API Error:${error.message}`);
    return errorResponse(res, 500, "Internal server error.");
  }
};

exports.updateOrder = async (req, res) => {
  try {
    logger.info("Ordere updated.");
    const { orderId } = req.params;
    const { products, city, state, country, zipCode, address } = req.body;
    const { userId } = req.user;
    let totalAmount = 0;
    const order = await findOrder({ id: orderId }, ["id"]);
    if (!order) {
      return errorResponse(res, 404, "Order not found.");
    }
    if (products) {
      for (item of products) {
        const deleteItem = await deleteOrderItemById(orderId);
        const product = await findProductById(item.productId);
        if (!product) {
          return errorResponse(
            res,
            404,
            `Thisproduct not found:${item.productId}`,
          );
        }
        await createOrderItem({
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity || 1,
          price: product.price,
        });
        totalAmount += product.price * (item.quantity || 1);
      }
    }
    await updateById(
      {
        userId,
        city,
        state,
        country,
        zipCode,
        address,
        totalAmount,
      },
      { id: orderId },
    );
    const updatedorder = await findOrderById(orderId);
    if (updatedorder) {
      return successResponse(
        res,
        200,
        "Order updated successfully.",
        updatedorder,
      );
    }
    return errorResponse(res, 400, "Order not updated.");
  } catch (error) {
    logger.error(`updateOrder API Error:${error.message}`);
    return errorResponse(res, 500, "Internal server error.");
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    logger.info("Orderes deleted.");
    const { orderId } = req.params;
    const order = await findOrder({ id: orderId }, ["id"]);
    if (!order) {
      return errorResponse(res, 404, "Order not found.");
    }
    await deleteOrderById(orderId);
    await deleteOrderItemById(orderId);
    return successResponse(res, 200, "Order deleted successfully.");
  } catch (error) {
    logger.error(`deleteOrder API Error:${error.message}`);
    return errorResponse(res, 500, "Internal server error.");
  }
};

exports.getUserWiseOrder = async (req, res) => {
  try {
    const orders = await findOrderByUser();
    if (!orders || orders.length == 0) {
      return errorResponse(res, 400, "Orders not found");
    }
    return successResponse(
      res,
      200,
      "Order list retrive successfully.",
      orders,
    );
  } catch (error) {
    logger.error(`getUserWiseOrder API Error:${error.message}`);
    return errorResponse(res, 500, "Internal server error.");
  }
};
