import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import { Typography } from "@material-ui/core";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import UpdateDiscount from "./component/Admin/UpdateDiscount.js";
import Discount from "./component/Admin/Discount.js";
import AboutPage from "./component/Home/AboutPage.js";
import DocumentPage from "./component/Home/DocumentPage.js";

import NotFound from "./component/layout/Not Found/NotFound";
import PrintBill from "./component/Admin/PrintBill";
import ImportCoupon from "./component/Admin/ImportCoupon";
import PrintCoupon from "./component/Admin/PrintCoupon.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header user={user} />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />

        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/me/update" element={<UpdateProfile />} />

        <Route exact path="/password/update" element={<UpdatePassword />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/about" element={<AboutPage />} />

        <Route exact path="/document" element={<DocumentPage />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/login/shipping" element={<Shipping />} />

        <Route exact path="/order/confirm" element={<ConfirmOrder />} />

        <Route exact path="/success" element={<OrderSuccess />} />

        <Route exact path="/orders" element={<MyOrders />} />

        <Route exact path="/order/:id" element={<OrderDetails />} />

        <Route exact path="/admin/dashboard" element={<Dashboard />} />

        <Route exact path="/admin/products" element={<ProductList />} />

        <Route exact path="/admin/product" element={<NewProduct />} />

        <Route exact path="/admin/product/:id" element={<UpdateProduct />} />

        <Route exact path="/admin/orders" element={<OrderList />} />

        <Route exact path="/admin/order/:id" element={<ProcessOrder />} />

        <Route exact path="/admin/order/printbill" element={<PrintBill />} />

        <Route exact path="/admin/users" element={<UsersList />} />

        <Route exact path="/admin/user/:id" element={<UpdateUser />} />

        <Route exact path="/admin/discount" element={<Discount />} />

        <Route exact path="/admin/discount/:id" element={<UpdateDiscount />} />

        <Route exact path="/admin/reviews" element={<ProductReviews />} />

        <Route exact path="/admin/coupon" element={<ImportCoupon />} />

        <Route exact path="/admin/coupon/:id" element={<PrintCoupon />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
