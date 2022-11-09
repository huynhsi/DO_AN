const express = require("express");
var bodyParser = require("body-parser");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(upload.array("file", 2), registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router
  .route("/password/update")
  .put(upload.single("file"), isAuthenticatedUser, updatePassword);

router
  .route("/me/update")
  .put(upload.array("file", 2), isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(
    upload.single("file"),
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateUserRole
  )
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
