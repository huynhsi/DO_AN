import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Shipping from "./Shipping";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
  };

  const proceedNormalPay = () => {
    // const paymentData = {
    //   amount: Math.round(totalPrice * 100),
    // };
    order.paymentInfo = {
      id: "dfngskdfngskdf",
      status: "thanh toan khi nhan",
    };

    dispatch(createOrder(order));

    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title="Comfirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Thông Tin Giao Hàng</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên:</p>
                <span>user.name</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Sản phẩm trong giỏ:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={`/../images/${item.image}`} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X đ{item.price} ={" "}
                      <b>đ{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Tổng Quan Đặt Hàng</Typography>
            <div>
              <div>
                <p>Tổng Giá Tiền:</p>
                <span>{subtotal}đ</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>Thuế sản phẩm đã bao gồm thuế:</p>
                <span>{tax}đ</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Thành Thiền:</b>
              </p>
              <span>{totalPrice}đ</span>
            </div>

            <button className="normal__payment" onClick={proceedNormalPay}>
              Thanh Toán
            </button>
            <button className="online__payment" onClick={proceedToPayment}>
              Thanh Toán Online
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
