const express = require("express");
var bodyParser = require("body-parser");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  updateDiscount,
  deleteProduct,
  deleteDiscount,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  deleteProductCheck,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("files", 24),
    createProduct
  );

router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("files", 24),
    updateProduct
  )
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/admin/product/:id/delete")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductCheck);

router
  .route("/admin/discount/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("files", 24),
    updateDiscount
  )
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDiscount);
router.route("/product/:id").get(getProductDetails);

router
  .route("/review")
  .put(upload.array("file", 2), isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
