import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
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
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={`../images/${product.images[0].url}`} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>

      {product.discount === null || product.discount === 0 ? (
        <span className="product--price__nodiscount">
          {`${product.price && product.price.toFixed(3)}đ`}
        </span>
      ) : (
        <>
          <div className="price-tag__discount">
            <p className="price-tag__text">{`- ${product.discount}%`}</p>
          </div>
          <div className="productCard--price">
            <span
              style={{
                textDecoration: "line-through",
                color: "#4c4949",
              }}
            >{`${product.price && product.price.toFixed(3)} `}</span>
            <span>
              {product.price &&
                (product.price * [(100 - product.discount) / 100]).toFixed(3)}
              đ
            </span>
            <p className="timeofdiscount">
              {takeDate(product.datestart)} {" đến "}
              {takeDate(product.dateend)}
            </p>
          </div>
        </>
      )}
    </Link>
  );
};

export default ProductCard;
