import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useParams, useNavigate } from "react-router-dom";
import DiscountIcon from "@mui/icons-material/Discount";
import StraightenIcon from "@mui/icons-material/Straighten";
import BadgeIcon from "@mui/icons-material/Badge";
import DateRangeIcon from "@mui/icons-material/DateRange";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [discount, setDiscount] = useState("");
  const [nameImages, setnameImages] = useState("");
  const [number1, setNumber1] = useState("");
  const [sizename1, setSizeName1] = useState("");
  const [number2, setNumber2] = useState("");
  const [sizename2, setSizeName2] = useState("");
  const [number3, setNumber3] = useState("");
  const [sizename3, setSizeName3] = useState("");
  const [number4, setNumber4] = useState("");
  const [sizename4, setSizeName4] = useState("");
  const [number5, setNumber5] = useState("");
  const [sizename5, setSizeName5] = useState("");
  const [number6, setNumber6] = useState("");
  const [sizename6, setSizeName6] = useState("");
  const [number7, setNumber7] = useState("");
  const [sizename7, setSizeName7] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const categories = [
    "Nike",
    "Adidas",
    "Puma",
    "Jordan",
    "vans",
    "Convert",
    "banlenciaga",
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);

      setOldImages(product.images);
      setDiscount(product.discount);
      setnameImages(product.nameImages);
      setNumber1(product.size1[1] || "");
      setSizeName1(product.size1[0] || "");
      setNumber2(product.size2[1] || "");
      setSizeName2(product.size2[0] || "");
      setNumber3(product.size3[1] || "");
      setSizeName3(product.size3[0] || "");
      setNumber4(product.size4[1] || "");
      setSizeName4(product.size4[0] || "");
      setNumber5(product.size5[1] || "");
      setSizeName5(product.size5[0] || "");
      setNumber6(product.size6[1] || "");
      setSizeName6(product.size6[0] || "");
      setNumber7(product.size7[1] || "");
      setSizeName7(product.size7[0] || "");
      setDateStart(product.datestart || "");
      setDateEnd(product.dateend || "");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("size1[0]", sizename1);
    myForm.set("size1[1]", number1);
    myForm.set("size2[0]", sizename2);
    myForm.set("size2[1]", number2);
    myForm.set("size3[0]", sizename3);
    myForm.set("size3[1]", number3);
    myForm.set("size4[0]", sizename4);
    myForm.set("size4[1]", number4);
    myForm.set("size5[0]", sizename5);
    myForm.set("size5[1]", number5);
    myForm.set("size6[0]", sizename6);
    myForm.set("size6[1]", number6);
    myForm.set("size7[0]", sizename7);
    myForm.set("size7[1]", number7);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("discount", discount);
    myForm.set("nameImages", nameImages);
    myForm.set("datestart", dateStart);
    myForm.set("dateend", dateEnd);

    Object.values(images).forEach((image) => {
      myForm.append("files", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
    console.log(e.target.files);
    setImages(e.target.files);
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>CẬP NHẬT SẢN PHẨM</h1>

            <div className="name__price">
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Tên Sản Phẩm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* <AttachMoneyIcon /> */}
              <input
                type="number"
                placeholder="Giá"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <div className="sizeofproduct">
                <input
                  type="number"
                  placeholder="Kích cỡ giày EX.38"
                  value={sizename1}
                  onChange={(e) => setSizeName1(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số lượng giày"
                  value={number1}
                  onChange={(e) => setNumber1(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích cỡ giày EX.39"
                  value={sizename2}
                  onChange={(e) => setSizeName2(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số lượng giày"
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích cỡ giày EX.40"
                  value={sizename3}
                  onChange={(e) => setSizeName3(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số lượng giày"
                  value={number3}
                  onChange={(e) => setNumber3(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích cỡ giày EX.41"
                  value={sizename4}
                  onChange={(e) => setSizeName4(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số lượng giày"
                  value={number4}
                  onChange={(e) => setNumber4(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích cỡ giày EX.42"
                  value={sizename5}
                  onChange={(e) => setSizeName5(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số lượng giày"
                  value={number5}
                  onChange={(e) => setNumber5(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích cỡ giày EX.43"
                  value={sizename6}
                  onChange={(e) => setSizeName6(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số lượng giày"
                  value={number6}
                  onChange={(e) => setNumber6(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích cỡ giày EX.44"
                  value={sizename7}
                  onChange={(e) => setSizeName7(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số lượng giày"
                  value={number7}
                  onChange={(e) => setNumber7(e.target.value)}
                />
              </div>
            </div>

            <div className="product--discription">
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div className="name__price">
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div className="name__price">
              <DiscountIcon />
              <input
                type="number"
                placeholder="Khuyến mãi (%)"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />

              {/* <BadgeIcon /> */}
              <input
                type="text"
                placeholder="Image Name"
                required
                value={nameImages}
                onChange={(e) => setnameImages(e.target.value)}
              />
            </div>
            <div className="name__price">
              <DateRangeIcon />
              <input
                type="date"
                placeholder="Ngày bắt đầu"
                onChange={(e) => setDateStart(e.target.value)}
              />

              <input
                type="date"
                placeholder="Ngày kết thúc"
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="files"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={`/../images/${image.url}`} alt="ten" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Cập Nhật
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
