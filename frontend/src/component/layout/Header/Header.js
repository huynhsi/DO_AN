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

const Header = () => {
  const navigate = useNavigate();

  const [fix, setFix] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isactive, setActive] = useState(false);
  const [mobile, setMobible] = useState(false);
  const [cartItem, setCartItem] = useState();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  function setFixed() {
    if (window.scrollY >= 200) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener("scroll", setFixed);

  const handleClick = (e) => {
    e.currentTarget.classList.toggle("is-active");
  };

  var temp = JSON.parse(localStorage["cartItems"]);

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
          onClick={handleClick}
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
      <div className="search__nav">
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

      <div className="shopping__nav">
        <Link to="/cart">
          <ShoppingCartOutlinedIcon className="cartIcon" />
          <span className="number--on__iconcart">
            {Object.keys(temp).length}
          </span>
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
