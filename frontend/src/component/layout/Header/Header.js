import React, { useState, Fragment, useEffect } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/Logoneker.png";
import logoshop3 from "../../../images/logoshop3.png";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { useNavigate } from "react-router-dom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import ReorderIcon from "@mui/icons-material/Reorder";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";

const Header = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { users } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [fix, setFix] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isactive, setActive] = useState(false);
  const [mobile, setMobible] = useState(false);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  // const backgroundNav = () => {
  //   let changetag = document.getElementsByClassName("home__nav");
  //   changetag[0].classList.toggle("is-active");
  // };
  // const backgroundProduct = () => {
  //   let changetag = document.getElementsByClassName("product__nav");
  //   changetag[0].classList.toggle("is-active");
  // };
  // const backgroundInfo = () => {
  //   let changetag = document.getElementsByClassName("info__nav");
  //   changetag[0].classList.toggle("is-active");
  // };
  // const backgroundDocument = () => {
  //   let changetag = document.getElementsByClassName("document__nav");
  //   changetag[0].classList.toggle("is-active");
  // };

  function setFixed() {
    if (window.scrollY >= 200) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener("scroll", setFixed);

  return (
    <div className={fix ? "container--header fixed" : "container--header"}>
      <div className="logo__nav">
        <img className="logoa-img" src={logoshop3} alt="logo_website" />
      </div>
      <div
        className={mobile ? "nav--mobile--list" : "container__nav"}
        onClick={() => setMobible(false)}
      >
        <Link className="home__nav" to="/">
          TRANG CHỦ
        </Link>

        <a
          // className={isactive ? "is-active" : ""}
          className="product__nav"
          href="/products"
        >
          SẢN PHẨM
        </a>

        <Link className="info__nav" to="/about">
          THÔNG TIN
        </Link>

        <Link className="document__nav" to="/document">
          HƯỚNG DẪN
        </Link>
      </div>

      <div
        className="search__nav"
        style={{
          display: user && user.role === "admin" ? "none" : "block",
        }}
      >
        <form onSubmit={searchSubmitHandler} className="form__nav">
          <div className="seacrch__input">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              name="search"
              type="text"
              placeholder="Bạn cần tìm gì?"
            />
            <SearchIcon />
          </div>
          <input
            type="submit"
            value="Tìm kiếm"
            className="submmitButton__nav"
          />
        </form>
      </div>

      <div className="user__nav">
        <Link to="/login">
          <AccountCircleOutlinedIcon className="boxIcon" />
        </Link>
      </div>

      <div
        className="shopping__nav"
        style={{
          display: user && user.role === "admin" ? "none" : "block",
        }}
      >
        <Link to="/cart">
          <ShoppingCartOutlinedIcon className="cartIcon" />
          {cartItems.length !== 0 && (
            <span className="number--on__iconcart">{cartItems.length}</span>
          )}
        </Link>
      </div>

      <button className="mobile-menu-icon">
        {mobile ? (
          <CloseIcon
            className="mobile--close"
            onClick={() => setMobible(false)}
          />
        ) : (
          <ReorderIcon
            className="mobile--list"
            onClick={() => setMobible(!mobile)}
          />
        )}
      </button>
    </div>
  );
};

export default Header;
