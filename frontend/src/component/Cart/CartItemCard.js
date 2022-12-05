import React from "react";
import "./CartitemCart.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={`/../images/${item.image}`} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Size: ${item.size}`}</span>
        <span>
          {`Price: ${item.price.toFixed(3)}đ`}
          {item.discount === 0 || item.discount === null
            ? ""
            : `-- Giảm: ${item.discount}%`}
        </span>
        <p onClick={() => deleteCartItems(item.product)}>Xóa</p>
      </div>
    </div>
  );
};

export default CartItemCard;
