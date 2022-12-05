import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getSingleCoupon } from "../../actions/couponAction";
import "./printCoupon.css";

function PrintCoupon() {
  const { coupon } = useSelector((state) => state.singleCoupon);
  const { id } = useParams();
  const dispatch = useDispatch();

  const couponId = id;

  useEffect(() => {
    if (coupon && coupon._id !== couponId) {
      dispatch(getSingleCoupon(couponId));
    }
  }, [dispatch, couponId]);

  return (
    <Fragment>
      <MetaData title={`In phiếu nhập - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <div className="wrapper">
            <h3 className="namecoupon">PHIẾU NHẬP HÀNG</h3>
            <address className="address_coupon">
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
            <p className="time__coupon">
              <i>Thời gian nhập: {String(Date.now()).substr(0, 10)}</i>
            </p>
            <table className="table_content">
              <thead className="header__coupon">
                <tr>
                  <th>STT</th>
                  <th>Nhà cung cấp</th>
                  <th>Thương hiệu</th>
                  <th>Số lượng</th>
                  <th>Tổng giá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{coupon.supplier}</td>
                  <td>{coupon.category}</td>
                  <td>{coupon.amount}</td>

                  <td>
                    {(coupon.price * coupon.amount)
                      .toFixed(3)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                    đ
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="sign__coupon">
              <p>Phê duyệt hoặc xác nhận</p>
              <i>Ký tên hoặc đóng dấu</i>
            </div>
          </div>

          <button className="button__print" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default PrintCoupon;
