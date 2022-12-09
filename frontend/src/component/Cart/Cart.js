import React, { Fragment, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const Cart = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock, size) => {
    {
      cartItems && cartItems.map((item) => (size = item.size));
    }
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, size));
  };

  const decreaseQuantity = (id, quantity, size) => {
    {
      cartItems && cartItems.map((item) => (size = item.size));
    }
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, size));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>Không Có Sản Phẩm Nào Trong Giỏ Hàng</Typography>
          <Link to="/products">Xem Các Sản Phẩm</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Sản Phẩm</p>
              <p>Số Lượng</p>
              <p>Giá</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>

                    <input type="number" value={item.quantity} readOnly />

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.Stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`${
                    item.discount === null || item.price === 0
                      ? (item.price * item.quantity).toFixed(3)
                      : (
                          item.price *
                          [(100 - item.discount) / 100] *
                          item.quantity
                        )
                          .toFixed(3)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&.")
                  }đ`}</p>
                </div>
              ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>
                  Tổng tiền:{" "}
                  {`${cartItems
                    .reduce(
                      (acc, item) =>
                        acc +
                        item.quantity *
                          (item.discount === null
                            ? item.price
                            : item.price * [(100 - item.discount) / 100]),
                      0
                    )
                    .toFixed(3)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&.")}đ`}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Thanh Toán</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
