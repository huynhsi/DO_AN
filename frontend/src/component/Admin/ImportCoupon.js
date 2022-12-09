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
import "./importCoupon.css";
import PrintIcon from "@mui/icons-material/Print";

import {
  clearErrors,
  createCoupon,
  getAllCoupon,
} from "../../actions/couponAction";
import { NEW_COUPON_RESET } from "../../constants/couponConstants";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import { useAlert } from "react-alert";

const ImportCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.coupon);

  const { coupon } = useSelector((state) => state.allCoupon);

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
      alert.success("Phiếu nhập được tạo thành công");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_COUPON_RESET });
    }
    dispatch(getAllCoupon());
  }, [dispatch, alert, error, success]);

  const categories = [
    "Nike",
    "Adidas",
    "Puma",
    "Jordan",
    "vans",
    "Convert",
    "banlenciaga",
  ];

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.7 },
    {
      field: "nhacc",
      headerName: "Nhà cung cấp",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "danhmuc",
      headerName: "Thương hiệu",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "luong",
      headerName: "Số lượng",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "gia",
      headerName: "Giá",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "ngaytao",
      headerName: "Ngày tạo",
      type: "date",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "In",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/coupon/${params.getValue(params.id, "id")}`}>
              <PrintIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  coupon &&
    coupon.forEach((item) => {
      rows.unshift({
        id: item._id,
        nhacc: item.supplier,
        danhmuc: item.category,
        luong: item.amount,
        gia: item.price,
        ngaytao: String(item.createdAt).substr(0, 10),
      });
    });

  return (
    <Fragment>
      <MetaData title="Phiếu nhập hàng" />
      <div className="dashboard">
        <Sidebar />
        <div className="newCouponContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createCouponForm"
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
                  <option value="">Chọn thương hiệu</option>
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

              <Button id="createCouponBtn" type="submit">
                Lưu Phiếu Nhập
              </Button>
            </form>
          )}
          <h1>TẤT CẢ PHIẾU NHẬP</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ImportCoupon;
