import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
  const dispatch = useDispatch();

  let { products } = useSelector((state) => state.products);

  let { orders } = useSelector((state) => state.allOrders);

  let { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalsiz1 = 0;
  products &&
    products.forEach((item) => {
      totalsiz1 += item.size1[1];
    });

  let totalsiz2 = 0;
  products &&
    products.forEach((item) => {
      totalsiz2 += item.size2[1];
    });

  let totalsiz3 = 0;
  products &&
    products.forEach((item) => {
      totalsiz3 += item.size3[1];
    });

  let totalsiz4 = 0;
  products &&
    products.forEach((item) => {
      totalsiz4 += item.size4[1];
    });

  let totalsiz5 = 0;
  products &&
    products.forEach((item) => {
      totalsiz5 += item.size5[1];
    });

  let totalsiz6 = 0;
  products &&
    products.forEach((item) => {
      totalsiz6 += item.size6[1];
    });

  let totalsiz7 = 0;
  products &&
    products.forEach((item) => {
      totalsiz7 += item.size7[1];
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  let tienhang = 0;
  products &&
    products.forEach((item) => {
      tienhang += item.price;
    });

  const lineState = {
    labels: ["0", "TONG"],
    datasets: [
      {
        label: "DOANH THU",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
      {
        label: "TIEN HANG",
        backgroundColor: ["blue"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, tienhang],
      },
    ],
  };

  const doughnutState = {
    labels: ["Hết hàng", "Còn hàng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  let totalcost = 0;
  const barState = {
    labels: [
      "Size.44",
      "Size.43",
      "Size.42",
      "Size.41",
      "Size.40",
      "size.39",
      "size.38",
    ],
    datasets: [
      {
        label: "SIZE GIAY",
        data: [
          totalsiz7,
          totalsiz6,
          totalsiz5,
          totalsiz4,
          totalsiz3,
          totalsiz2,
          totalsiz1,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Thống kê - Admin" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Thống Kê</Typography>
        <span>Thời Gian:</span>
        <input
          type="date"
          name="begin"
          placeholder="dd-mm-yyyy"
          value=""
          min="2021-01-01"
          max="2022-12-31"
        />

        <div className="dashboardSummary">
          <div>
            <p>
              Tổng Doanh Thu <br />
              {totalAmount.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.")}đ
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Sẩn phẩm</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Đơn hàng</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Người dùng</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        {/* <div className="doughnutChart">
        <Doughnut data={doughnutState} />
      </div> */}

        <div className="barchart">
          <Bar data={barState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
