import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  clearErrors,
  getAdminProduct,
  deleteDiscount,
} from "../../actions/productAction";
import { DELETE_DISCOUNT_RESET } from "../../constants/productConstants";

function Discount() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteDiscount(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Discount Deleted Successfully");
      navigate("/admin/discount");
      dispatch({ type: DELETE_DISCOUNT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 1 },

    {
      field: "name",
      headerName: "Tên",
      minWidth: 100,
      flex: 1,
    },

    {
      field: "discount",
      headerName: "% Giảm",
      type: "number",
      minWidth: 50,
      flex: 0.4,
    },

    {
      field: "datestart",
      headerName: "Ngày Bắt đầu",
      type: "date",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "dateend",
      headerName: "Ngày kết thúc",
      type: "date",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Sửa",
      minWidth: 50,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/discount/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      item.discount !== null &&
        item.discount !== 0 &&
        rows.push({
          id: item._id,
          name: item.name,
          discount: item.discount,
          datestart: item.datestart,
          dateend: item.dateend,
        });
    });

  return (
    <Fragment>
      <MetaData title={`Tất cả Đơn hàng - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">Tất Cả Phiếu Giảm Giá</h1>

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
}

export default Discount;
