import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let { users } = useSelector((state) => state.allUsers);
  const [dateTime, setDateTime] = useState("");
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  let tienhang = 0;
  let outOfStock = 0;
  let totalAmount = 0;

  products &&
    products.forEach((item) => {
      tienhang += item.price;
    });

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  let tongdanhthu = totalAmount;

  const [danhthu, setDanhThu] = useState(tongdanhthu);
  let danhthusau = 0;
  let sanphamsau = 0;
  let donhangsau = 0;
  let nguoidungsau = 0;

  const handalDatetime = (e) => {
    orders &&
      orders.forEach((item) => {
        String(dateTime).substr(0, 10) < String(item.createdAt).substr(0, 10) &&
          (danhthusau += item.totalPrice);
      });
    setDanhThu(danhthusau);

    products &&
      products.forEach((product) => {
        String(dateTime).substr(0, 10) <
          String(product.createdAt).substr(0, 10) && (sanphamsau += 1);
      });
    setTotalProduct(sanphamsau);

    orders &&
      orders.forEach((order) => {
        String(dateTime).substr(0, 10) <
          String(order.createdAt).substr(0, 10) && (donhangsau += 1);
      });
    setTotalOrder(donhangsau);

    users &&
      users.forEach((user) => {
        String(dateTime).substr(0, 10) < String(user.createdAt).substr(0, 10) &&
          (nguoidungsau += 1);
      });
    setTotalUser(nguoidungsau);
  };

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

  const lineState = {
    labels: ["0", "TONG"],
    datasets: [
      {
        label: "TIỀN HÀNG",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
      {
        label: "DOANH THU",
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
        label: "SIZE ĐÃ BÁN",
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
          className="dataDashboard"
          type="date"
          name="begin"
          placeholder="dd-mm-yyyy"
          min="2016-01-01"
          max="2022-12-31"
          onChange={(e) => setDateTime(e.target.value)}
        />
        <button id="createDeleteUserBtn" onClick={handalDatetime}>
          Thống kê
        </button>

        <div className="dashboardSummary">
          <div>
            <p>
              Tổng Doanh Thu <br />
              {danhthu == 0
                ? totalAmount.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.")
                : danhthu.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&.")}
              đ
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Sẩn phẩm</p>
              <p>
                {totalProduct == 0 ? products && products.length : totalProduct}
              </p>
            </Link>
            <Link to="/admin/orders">
              <p>Đơn hàng</p>
              <p>{totalOrder == 0 ? orders && orders.length : totalOrder}</p>
            </Link>
            <Link to="/admin/users">
              <p>Người dùng</p>
              <p>{totalUser == 0 ? users && users.length : totalUser}</p>
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
