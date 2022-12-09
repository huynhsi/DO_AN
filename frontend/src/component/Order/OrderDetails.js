import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Đơn hàng #{order && order._id}
              </Typography>
              <Typography>Địa chỉ giao hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Tên:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Địa chỉ:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state},  ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Thanh toán</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "Đã nhận"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Tổng thanh toán:</p>
                  <span>
                    {order.totalPrice &&
                      order.totalPrice
                        .toFixed(3)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                    đ
                  </span>
                </div>
              </div>

              <Typography>Trạng thái đơn hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Đã nhận"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={`/../images/${item.image}`} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name} -- size: {item.size}
                        {item.discount === 0 ||
                        item.discount === null ||
                        item.discount === undefined
                          ? ""
                          : `-- Giảm: ${item.discount}%`}
                      </Link>
                      <span>
                        {`${item.quantity} X ${item.price.toFixed(3)}đ =`}
                        <b>{(item.price * item.quantity).toFixed(3)}đ</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
