const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  supplier: {
    type: String,
    // required: [true, "Please Enter product suplier"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  amount: {
    type: Number,
    required: [true, "Please Enter product amount"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product price"],
  },
  totalprice: {
    type: Number,
    default: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Coupon", couponSchema);
