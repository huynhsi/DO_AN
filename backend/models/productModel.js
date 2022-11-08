const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  nameImages: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  size1: [
    {
      type: Number,
      default: null,
    },
    {
      type: Number,
      default: null,
    },
  ],
  size2: [
    {
      type: Number,
      default: null,
    },
    {
      type: Number,
      default: null,
    },
  ],
  size3: [
    {
      type: Number,
      default: null,
    },
    {
      type: Number,
      default: null,
    },
  ],
  size4: [
    {
      type: Number,
      default: null,
    },
    {
      type: Number,
      default: null,
    },
  ],
  size5: [
    {
      type: Number,
      default: null,
    },
    {
      type: Number,
      default: null,
    },
  ],
  size6: [
    {
      type: Number,
      default: null,
    },
    {
      type: Number,
      default: null,
    },
  ],
  size7: [
    {
      type: Number,
      default: null,
    },
    {
      type: Number,
      default: null,
    },
  ],

  discount: {
    type: Number,
    default: null,
  },
  datestart: {
    type: Date,
    default: null,
  },
  dateend: {
    type: Date,
    default: null,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
