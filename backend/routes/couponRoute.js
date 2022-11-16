const express = require("express");
const { newCoupon } = require("../controllers/couponController");

const upload = require("../middleware/upload");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/admin/coupon/new")
  .post(
    upload.single("file"),
    isAuthenticatedUser,
    authorizeRoles("admin"),
    newCoupon
  );

module.exports = router;
