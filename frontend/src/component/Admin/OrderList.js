import React, { Fragment, useEffect } from "react";
import { DataGrid, getGridDateOperators } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { getDatasetAtEvent } from "react-chartjs-2";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Xóa đơn hàng thành công");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  function takeDate(date) {
    const datevalue = new Date(date);
    let day = datevalue.getDate();
    let month = datevalue.getMonth() + 1;
    let year = datevalue.getFullYear();

    if (month < 10 && day >= 10) {
      return day + "-0" + month + "-" + year;
    } else if (month < 10 && day >= 10) {
      return "0" + day + "-0" + month + "-" + year;
    } else if (month >= 10 && day < 10) {
      return "0" + day + "-" + month + "-" + year;
    } else if (month >= 10 && day >= 10) {
      return day + "-" + month + "-" + year;
    }
  }

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },
    { field: "ngaydat", headerName: "Ngày Đặt", minWidth: 100, flex: 0.5 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 100,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Tổng giá",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Sửa",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.unshift({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&."),
        status: item.orderStatus,
        ngaydat: takeDate(item.createdAt),
      });
    });

  return (
    <Fragment>
      <MetaData title={`Tất cả Đơn hàng - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Tất cả đơn hàng</h1>

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

export default OrderList;
