import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import "./printBill.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
const PrintBill = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  return (
    <Fragment>
      <MetaData title={`In hóa đơn - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <div className="wrapper">
            <section className="invoice">
              <div className="row">
                <div className="col-12">
                  <h2 className="page-header">
                    SHOPE_SHOSES.
                    <small>_.2022</small>
                  </h2>
                </div>
              </div>

              <div className="row invoice-info">
                <div className="col-sm-4 invoice-col">
                  <address>
                    <br />
                    <strong>SHOPE_SHOSES.</strong>
                    <br />
                    đường 3/2, phường Xuân Khánh
                    <br />
                    quận Ninh Kiều, tp. Cần Thơ
                    <br />
                    Phone: (84) 123-4567
                    <br />
                    Email: huynhsi@gmail.com
                  </address>
                </div>
                <br />
                <hr />
                <br />
                <div className="col-sm-4 invoice-col">
                  <address>
                    <strong>Địa chỉ nhận hàng</strong>
                    <strong>{order.user && order.user.name}</strong>
                    <br />
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`}
                    <br />
                    Phone: {order.shippingInfo && order.shippingInfo.phoneNo}
                    <br />
                    {/* Email: phuc@gmail.com */}
                  </address>
                </div>
                <br />
                <div className="col-sm-4 invoice-col">
                  <br />
                  <b>Order ID:</b> {order._id && order._id}
                  <br />
                  <b>Payment Due:</b> {Date.now()}
                  <br />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="table-responsive">
                  <table className="table-striped">
                    <thead>
                      <tr>
                        <th>Qty</th>
                        <th>Product</th>
                        <th>Size #</th>

                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <tr>
                            <td>{item.quantity}</td>
                            <td>{item.name}</td>
                            <td>{item.size}</td>

                            <td>
                              {(item.price * item.quantity)
                                .toFixed(3)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <div className="row">
                <br />
                <div className="col-6">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>Tax</th>
                          <td>Sản phẩm đã bao gồm thuế.</td>
                        </tr>
                        <tr>
                          <th>Shipping:</th>
                          <td>30.000đ</td>
                        </tr>
                        <tr>
                          <th>Total:</th>
                          <td>
                            {order.totalPrice &&
                              order.totalPrice
                                .toFixed(3)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                            đ
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  <hr />
                  <br />
                  <div className="col-6">
                    <p className="text-muted well well-sm shadow-none">
                      Cảm ơn quý khách đã tin tưởng ủng hộ Shoe_Shop, mong được
                      phục vụ quý khách tốt nhất!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <button className="button__print" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default PrintBill;
