const Order = require("../models/orderModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addOrder = async (req, res) => {
  const data = req.body;
  let invoiceNumber = "00001";

  try {
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    if (lastOrder && lastOrder?.invoiceNumber) {
      const invoiceNb = lastOrder?.invoiceNumber;
      const newNumber = parseInt(invoiceNb) + 1;
      invoiceNumber = `${newNumber.toString().padStart(4, "0")}`;
    }

    const orderData = {
      ...data,
      invoiceNumber,
    };

    const result = await Order.create(orderData);

    return res.status(200).json({
      success: true,
      message: "Order create success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("products.product");

    const total = await Order.countDocuments({});
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products.product");

    if (!order) {
      return res.json({
        success: false,
        message: "order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.json({
        success: false,
        message: "order not found",
      });
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order delete success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.json({
        success: false,
        message: "order not found",
      });
    }

    await Order.findByIdAndUpdate(id, { status });
    res.status(200).json({
      success: true,
      message: "Order status update success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
