import React, { Fragment, useEffect, useRef, useState } from "react";
import Tridi from "react-tridi";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Radio,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import ThreeSixty from "react-360-view";
import $ from "jquery";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [radio1, setRadio1] = useState("");
  const [radio2, setRadio2] = useState("");
  const [radio3, setRadio3] = useState("");
  const [radio4, setRadio4] = useState("");
  const [radio5, setRadio5] = useState("");
  const [radio6, setRadio6] = useState("");
  const [radio7, setRadio7] = useState("");
  const [size, setSize] = useState("");

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  $(document).ready(function () {
    $(".messageCheckbox").click(function () {
      var b = 0;
      var c = 0;
      $('input[name="check"]:checked').each(function () {
        b = parseInt($(this).val(), 10);
        var sizeItem = ("$(this)", b);
        setSize(sizeItem);
      });
    });
  });

  var group_ = (el, callback) => {
    el.forEach((checkbox) => {
      callback(checkbox);
    });
  };

  group_(document.getElementsByName("check"), (item) => {
    item.onclick = (e) => {
      group_(document.getElementsByName("check"), (item) => {
        item.checked = false;
        setRadio1("");
        setRadio2("");
        setRadio3("");
        setRadio4("");
        setRadio5("");
        setRadio6("");
        setRadio7("");
      });
      e.target.checked = true;
    };
  });

  const increaseQuantity = () => {
    if (radio1 === "38" && product.size1[1] <= quantity) {
      return;
    } else if (radio2 === "39" && product.size2[1] <= quantity) {
      return;
    } else if (radio3 === "40" && product.size3[1] <= quantity) {
      return;
    } else if (radio4 === "41" && product.size4[1] <= quantity) {
      return;
    } else if (radio5 === "42" && product.size5[1] <= quantity) {
      return;
    } else if (radio6 === "43" && product.size6[1] <= quantity) {
      return;
    } else if (radio7 === "44" && product.size7[1] <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity, size));
    alert.success("Items Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <ThreeSixty
                amount={24}
                imagePath="../images"
                fileName={`${product.nameImages}{index}.jpg`}
              />
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Sản Phẩm # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Đánh Giá)
                </span>
              </div>
              {/* size */}

              <div className="detailsSize">
                <input
                  type="radio"
                  id="size38"
                  className="messageCheckbox tick"
                  name="check"
                  value="38"
                  onClick={() => {
                    setRadio1("38");
                  }}
                />
                <label
                  htmlFor="size38"
                  className={
                    product.size1 && product.size1[1] > 1
                      ? "detailsSize--item"
                      : "display:none"
                  }
                >
                  {product.size1 && product.size1[0]}
                </label>
                <input
                  type="radio"
                  id="size39"
                  className="messageCheckbox"
                  name="check"
                  value="39"
                  onClick={() => setRadio1("39")}
                />
                <label
                  htmlFor="size39"
                  className={
                    product.size2 && product.size2[1] > 1
                      ? "detailsSize--item"
                      : "display:none"
                  }
                >
                  {product.size2 && product.size2[0]}
                </label>
                <input
                  type="radio"
                  id="size40"
                  className="messageCheckbox"
                  name="check"
                  value="40"
                  onClick={() => setRadio3("40")}
                />
                <label
                  htmlFor="size40"
                  className={
                    product.size3 && product.size3[1] > 1
                      ? "detailsSize--item"
                      : "display:none"
                  }
                >
                  {product.size3 && product.size3[0]}
                </label>
                <input
                  type="radio"
                  id="size41"
                  className="messageCheckbox"
                  name="check"
                  value="41"
                  onClick={() => setRadio4("41")}
                />
                <label
                  htmlFor="size41"
                  className={
                    product.size4 && product.size4[1] > 1
                      ? "detailsSize--item"
                      : "display:none"
                  }
                >
                  {product.size4 && product.size4[0]}
                </label>
                <input
                  type="radio"
                  id="size42"
                  className="messageCheckbox"
                  name="check"
                  value="42"
                  onClick={() => setRadio5("42")}
                />
                <label
                  htmlFor="size42"
                  className={
                    product.size5 && product.size5[1] > 1
                      ? "detailsSize--item"
                      : "display:none"
                  }
                >
                  {product.size5 && product.size5[0]}
                </label>
                <input
                  type="radio"
                  id="size43"
                  className="messageCheckbox"
                  name="check"
                  value="43"
                  onClick={() => setRadio6("43")}
                />
                <label
                  htmlFor="size43"
                  className={
                    product.size6 && product.size6[1] > 1
                      ? "detailsSize--item"
                      : "display:none"
                  }
                >
                  {product.size6 && product.size6[0]}
                </label>
                <input
                  type="radio"
                  id="size44"
                  className="messageCheckbox"
                  name="check"
                  value="44"
                  onClick={() => setRadio7("44")}
                />
                <label
                  htmlFor="size44"
                  className={
                    product.size7 && product.size7[1] > 1
                      ? "detailsSize--item"
                      : "display:none"
                  }
                >
                  {product.size7 && product.size7[0]}
                </label>
              </div>

              <div className="detailsBlock-3">
                <div className="deailsBlock--price">
                  {product.discount === null ? (
                    <h1 className="deailsBlock--price__old">{`${
                      product.price && product.price.toFixed(3)
                    } đ`}</h1>
                  ) : (
                    <Fragment>
                      <span className="deailsBlock--price__new">{`${
                        product.price && product.price.toFixed(3)
                      } đ`}</span>
                      <h1 className="deailsBlock--price__discount">
                        {product.price &&
                          (
                            product.price * [(100 - product.discount) / 100]
                          ).toFixed(3)}{" "}
                        đ
                      </h1>
                    </Fragment>
                  )}
                </div>

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    id="buttondis"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Thêm Vào Giỏ
                  </button>
                </div>

                <p>
                  Trạng Thái:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Hết hàng" : "Còn hàng"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Mô tả : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Đánh Giá
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">Đánh Giá</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Đánh Giá</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                name="unique-rating"
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Hủy
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Thêm
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">Không có đánh giá nào!</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
