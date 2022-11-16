import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";

import { clearErrors, createCoupon } from "../../actions/couponAction";
import { NEW_COUPON_RESET } from "../../constants/couponConstants";
import { useNavigate } from "react-router-dom";

const ImportCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.inportCoupon
  );
  // const { loading, error, user } = useSelector((state) => state.userDetails);

  const [category, setCategory] = useState("");
  const [suplier, setSuplier] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const createCouponSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("supplier", suplier);
    myForm.set("category", category);
    myForm.set("amount", amount);
    myForm.set("price", price);

    dispatch(createCoupon(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Coupon Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_COUPON_RESET });
    }
  }, [dispatch, navigate, alert, error, success]);

  const categories = [
    "Nike",
    "Adidas",
    "Puma",
    "Jordan",
    "vans",
    "Convert",
    "banlenciaga",
  ];

  return (
    <Fragment>
      <MetaData title="Phiếu nhập hàng" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={createCouponSubmitHandler}
            >
              <h1>PHIẾU NHẬP HÀNG</h1>

              <div>
                <FactoryIcon />
                <input
                  type="text"
                  placeholder="Nhà cung cấp"
                  required
                  value={suplier}
                  onChange={(e) => setSuplier(e.target.value)}
                />
              </div>

              <div>
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Chọn danh mục</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <InventoryIcon />
                <input
                  type="number"
                  placeholder="Số lượng"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <LocalOfferIcon />
                <input
                  type="number"
                  placeholder="Đơn giá"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <Button id="createProductBtn" type="submit">
                Lưu Phiếu Nhập
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ImportCoupon;
