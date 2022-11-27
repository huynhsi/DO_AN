import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import image1 from "../../images/slideshoe1.png";
import image2 from "../../images/slideshoe2.png";
import image3 from "../../images/slideshoe3.png";
import bannerad from "../../images/bannerad.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import $ from "jquery";
import logoAdidas from "../../images/logo-adidass-216x78.png";
import logoNike from "../../images/logo-nike-216x78.png";
import logoVans from "../../images/new-bl.png";
import logPuma from "../../images/logo-puma-new-216x78.png";
import logConverse from "../../images/conversasc.png";
import logJordan from "../../images/air-jordan-150x150.png";
import hangchinhhang from "../../images/hang_chinh_hang.jpg";
import bannerad1 from "../../images/Essential_Nike.jpg";
import bannerad2 from "../../images/ads_images.png";
import bannerad3 from "../../images/Nike_AMD_Revolution.jpg";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [current, setCurrent] = useState(0);
  // const [active, setActive] = useState(0);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert, active]);

  var count_group = $(".list .item").length;
  var active = 0;

  const loadbanner = () => {
    var bg = $("#item_" + active).data("bg");
    var cl = $("#item_" + active).data("cl");

    $("#item_" + (active - 1 < 0 ? count_group - 1 : active - 1)).removeClass(
      "item_active"
    );
    $("#item_" + (active - 1 < 0 ? count_group - 1 : active - 1)).addClass(
      "item_none"
    );

    $("#item_" + active).removeClass("item_none");
    $("#item_" + active).addClass("item_active");
    $(".bg-rotate").css("background", bg);
    $(".alphabets").css("color", cl);

    $(".dot div").removeClass("active");
    $("#dot_" + active).addClass("active");

    // content
    $("#content_" + active).css("opacity", 1);
    $("#content_" + active).css("left", 0);
    $("#content_" + (active - 1 < 0 ? count_group - 1 : active - 1)).css(
      "left",
      "-100%"
    );
    $("#content_" + (active - 1 < 0 ? count_group - 1 : active - 1)).css(
      "opacity",
      "0"
    );
    $(
      "#content_" +
        (active - 2 == -1
          ? count_group - 1
          : active - 2 == -2
          ? count_group - 2
          : active - 2)
    ).css("left", "100%");
  };

  loadbanner();
  $("#next").on("click", function () {
    active = active + 1 >= count_group ? 0 : active + 1;

    loadbanner();
  });
  $("#prev").on("click", function () {
    active = active - 1 < 0 ? count_group - 1 : active - 1;

    loadbanner();
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="home--brand__content">
            {/* <div className="brand--size__price">
              <div className="dropdown--size">
                <div className="dropdown__trigger">Size</div>
                <div className="dropdown__content">
                  <ul>
                    <li>38</li>
                    <li>39</li>
                    <li>40</li>
                    <li>41</li>
                    <li>42</li>
                    <li>43</li>
                    <li>44</li>
                  </ul>
                </div>
              </div>
              <div className="dropdown--price">
                <div className="dropdown__trigger-2">Price</div>
                <div className="dropdown__content-2">
                  <ul>
                    <li>250</li>
                    <li>300</li>
                    <li>350</li>
                    <li>400</li>
                    <li>450</li>
                    <li>500</li>
                    <li>550</li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="brand--logo__img">
              <ul>
                <li>
                  <Link to="/products">
                    <img className="home--brand__images" src={logoNike} />
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <img className="home--brand__images" src={logoAdidas} />
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <img className="home--brand__images" src={logoVans} />
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <img className="home--brand__images" src={logConverse} />
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <img className="home--brand__images" src={logJordan} />
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <img className="home--brand__images" src={logPuma} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="banner">
            <div className="container">
              <div className="header"></div>
              <div className="list">
                <div className="bg-rotate"></div>
                <div className="wall"></div>
                <div
                  className="item item_active"
                  id="item_0"
                  data-bg="#C7DDE8"
                  data-cl="#4A4C65"
                >
                  <div className="img">
                    <img src={image1} />
                  </div>
                  <div className="alphabets">
                    <div>
                      <span>S</span>
                    </div>
                    <div>
                      <span>H</span>
                    </div>
                    <div>
                      <span>O</span>
                    </div>
                    <div>
                      <span>S</span>
                    </div>
                    <div>
                      <span>E</span>
                    </div>
                    <div>
                      <span>S</span>
                    </div>
                  </div>
                </div>
                <div
                  className="item"
                  id="item_1"
                  data-bg="#ADBA85"
                  data-cl="rgb(85 98 45)"
                >
                  <div className="img">
                    <img src={image2} />
                  </div>
                  <div className="alphabets">
                    <div>
                      <span>S</span>
                    </div>
                    <div>
                      <span>H</span>
                    </div>
                    <div>
                      <span>O</span>
                    </div>
                    <div>
                      <span>S</span>
                    </div>
                    <div>
                      <span>E</span>
                    </div>
                    <div>
                      <span>S</span>
                    </div>
                  </div>
                </div>
                <div
                  className="item"
                  id="item_2"
                  data-bg="#C2AA88"
                  data-cl="#3D3C3A"
                >
                  <div className="img">
                    <img src={image3} />
                  </div>
                  <div className="alphabets">
                    <div>
                      <span>S</span>
                    </div>
                    <div>
                      <span>H</span>
                    </div>
                    <div>
                      <span>O</span>
                    </div>
                    <div>
                      <span>S</span>
                    </div>
                    <div>
                      <span>E</span>
                    </div>
                    <div>
                      <span>S</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dot">
                <div id="dot_0" className="active"></div>
                <div id="dot_1"></div>
                <div id="dot_2"></div>
              </div>
              <div className="content">
                <div className="item" id="content_0">
                  <h1>Khuyến mãi siêu HOT</h1>
                  <p>Giảm giá nhiều sản phẩm</p>
                  <p>Bảo hành 3 tháng</p>
                  <p>1 đổi 1 trong 3 ngày đầu!</p>
                  {/* <img src={hangchinhhang} /> */}
                </div>
                <div className="item" id="content_1">
                  <h1>Khuyến mãi siêu HOT</h1>
                  <p>Giảm giá nhiều sản phẩm</p>
                  <p>Bảo hành 3 tháng</p>
                  <p>1 đổi 1 trong 3 ngày đầu!</p>
                </div>
                <div className="item" id="content_2">
                  <h1>Khuyến mãi siêu HOT</h1>
                  <p>Giảm giá nhiều sản phẩm</p>
                  <p>Bảo hành 3 tháng</p>
                  <p>1 đổi 1 trong 3 ngày đầu!</p>
                </div>
              </div>

              <div className="next">
                <button id="prev">
                  <ArrowBackIosIcon id="prev" />
                </button>
                <button id="next">
                  <ArrowForwardIosIcon id="next" />
                </button>
              </div>
            </div>
          </div>

          <img src={bannerad} className="banner--ad__home" />
          {/* <div className="banner--ad__home2">
            <span>
              <img src={bannerad1} />
              <img src={bannerad2} />
            </span>
            <img src={bannerad3} />
          </div> */}
          <h2 className="homeHeading">Sản Phẩm Nổi Bậc</h2>

          <div className="container--under" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
