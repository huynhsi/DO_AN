import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";

const categories = [
  "Nike",
  "Adidas",
  "Puma",
  "Jordan",
  "vans",
  "Convert",
  "banlenciaga",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 800]);
  const [category, setCategory] = useState("");
  const [size1, setSize1] = useState(0);
  const [size2, setSize2] = useState(0);
  const [size3, setSize3] = useState(0);
  const [size4, setSize4] = useState(0);
  const [size5, setSize5] = useState(0);
  const [size6, setSize6] = useState(0);
  const [size7, setSize7] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (even, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(
      getProduct(
        keyword,
        currentPage,
        price,
        category,
        size1,
        size2,
        size3,
        size4,
        size5,
        size6,
        size7,
        discount,
        ratings
      )
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    size1,
    size2,
    size3,
    size4,
    size5,
    size6,
    size7,
    discount,
    ratings,
    alert,
    error,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Sản Phẩm</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Giá</Typography>
            <Slider
              className="price-bar"
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={800}
            />

            <Typography>Danh Mục</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <Typography>Kích cỡ</Typography>
            <ul className="categoryBox">
              <li className="category-link" onClick={() => setSize1(38)}>
                S-38
              </li>
              <li className="category-link" onClick={() => setSize2(39)}>
                S-39
              </li>
              <li className="category-link" onClick={() => setSize3(40)}>
                S-40
              </li>
              <li className="category-link" onClick={() => setSize4(41)}>
                S-41
              </li>
              <li className="category-link" onClick={() => setSize5(42)}>
                S-42
              </li>
              <li
                className="category-link"
                onClick={() => setSize6(Number(43))}
              >
                S-43
              </li>
              <li className="category-link" onClick={() => setDiscount(10)}>
                S-44
              </li>
            </ul>

            <fieldset>
              <Typography component="legend">Đánh Giá</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
