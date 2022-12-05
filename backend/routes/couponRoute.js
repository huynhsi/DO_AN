const express = require("express");
const {
  newCoupon,
  getAllCoupon,
  getSinglecoupon,
} = require("../controllers/couponController");

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
router
  .route("/admin/coupons")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllCoupon);
router
  .route("/admin/coupons/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSinglecoupon);

module.exports = router;
