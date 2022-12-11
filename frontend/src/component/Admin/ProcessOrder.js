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
      alert.success("Cập nhật đơn hàng thành công");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Xử lý đơn hàng" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              // style={{
              //   display: order.orderStatus === "Đã nhận" ? "block" : "grid",
              // }}
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
                          ? "Đã Thanh Toán"
                          : "Chưa Thanh Toán"}
                      </p>
                    </div>

                    <div>
                      <p>Thành tiền:</p>
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
                <div className="confirmCartItems">
                  <Typography>Sản phẩm</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={`/../images/${item.image}`} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name} {" -- "}size: {item.size}
                            {item.discount === 0 ||
                            item.discount === null ||
                            item.discount === undefined
                              ? ""
                              : `-- Giảm: ${item.discount}%`}
                          </Link>{" "}
                          <span>
                            {`${item.quantity} X ${
                              item.discount === null ||
                              item.discount === 0 ||
                              item.discount === undefined
                                ? item.price.toFixed(3)
                                : (
                                    item.price * [(100 - item.discount) / 100]
                                  ).toFixed(3)
                            }đ =`}
                            <b>
                              {item.discount === null ||
                              item.discount === 0 ||
                              item.discount === undefined
                                ? (item.price * item.quantity)
                                    .toFixed(3)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&.")
                                : (
                                    item.price *
                                    [(100 - item.discount) / 100] *
                                    item.quantity
                                  )
                                    .toFixed(3)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                              đ
                            </b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
              // style={{
              //   display: order.orderStatus === "Đã nhận" ? "none" : "block",
              // }}
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
                      )}
                      {order.orderStatus === "Đang xử lý" && (
                        <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                      )}

                      {order.orderStatus === "Xác nhận đơn hàng" && (
                        <option value="Đang giao">Đang giao</option>
                      )}
                      {order.orderStatus === "Đang giao" && (
                        <option value="Chờ nhận hàng">Chờ nhận hàng</option>
                      )}
                      {order.orderStatus === "Chờ nhận hàng" && (
                        <option value="Đã nhận">Đã nhận</option>
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
