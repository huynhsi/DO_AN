import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = () => {
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Đã nhận" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Địa chỉ giao hàng</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Tên:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Điện thoại:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Thanh toán</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "Paid"
                          : "Not Paid"}
                      </p>
                    </div>

                    <div>
                      <p>Giá:</p>
                      <span>
                        {order.totalPrice && order.totalPrice.toFixed(3)}
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
                <div className="confirmCartItems">
                  <Typography>Sản phẩm trong giỏ:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={`/../images/${item.image}`} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name} &nbsp;&nbsp;&nbsp;&nbsp; size:{" "}
                            {item.size}
                          </Link>{" "}
                          <span>
                            {item.quantity} X {item.price}đ ={" "}
                            <b>{(item.price * item.quantity).toFixed(3)}đ</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Đã nhận" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Xử Lý Đặt Hàng</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Chọn Danh Mục</option>
                      {order.orderStatus === "Đang xử lý" && (
                        <option value="Xác nhận đơn hàng">
                          Xác nhận đơn hàng
                        </option>
                        // (<option value="Hủy đơn hàng">Hủy đơn hàng</option>),
                        // (<option value="Đang giao">Đang giao</option>),
                        // (<option value="Chờ nhận hàng">Chờ nhận hàng</option>),
                        // (<option value="Đã giao">Đã giao</option>)
                      )}
                      {order.orderStatus === "Đang xử lý" && (
                        <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                      )}

                      {order.orderStatus === "Xác nhận đơn hàng" && (
                        <option value="Đang giao">Đang giao</option>
                      )}
                      {order.orderStatus === "Xác nhận đơn hàng" && (
                        <option value="Chờ nhận hàng">Chờ nhận hàng</option>
                      )}
                      {order.orderStatus === "Xác nhận đơn hàng" && (
                        <option value="Đã nhận">Đã nhận</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Xử lý
                  </Button>
                </form>
                <Link to="/admin/order/printbill">
                  <button className="creataBillBtn">In Hóa Đơn</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
