const Coupon = require("../models/couponModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create a coupon
exports.newCoupon = catchAsyncErrors(async (req, res, next) => {
  const { supplier, category, amount, price } = req.body;

  const coupon = await Coupon.create({
    supplier,
    category,
    amount,
    price,
    createdAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    coupon,
  });
});
