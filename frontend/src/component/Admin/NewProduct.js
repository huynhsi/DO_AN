import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import DiscountIcon from "@mui/icons-material/Discount";
import StraightenIcon from "@mui/icons-material/Straighten";
import BadgeIcon from "@mui/icons-material/Badge";
import DateRangeIcon from "@mui/icons-material/DateRange";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [nameImages, setnameImages] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, navigate, alert, error, success]);

  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <MetaData title="Thêm Sản Phẩm Mới" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            action="/admin/product/new"
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>THÊM SẢN PHẨM</h1>
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
              />
            </div>

            <div>
              <div className="sizeofproduct">
                <input
                  type="number"
                  placeholder="Kích Cỡ giày EX.38"
                  onChange={(e) => setSizeName1(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số Lượng giày"
                  onChange={(e) => setNumber1(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích Cỡ giày EX.39"
                  onChange={(e) => setSizeName2(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số Lượng giày"
                  onChange={(e) => setNumber2(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích Cỡ giày EX.40"
                  onChange={(e) => setSizeName3(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số Lượng giày"
                  onChange={(e) => setNumber3(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích Cỡ giày EX.41"
                  onChange={(e) => setSizeName4(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số Lượng giày"
                  onChange={(e) => setNumber4(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích Cỡ giày EX.42"
                  onChange={(e) => setSizeName5(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số Lượng giày"
                  onChange={(e) => setNumber5(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích Cỡ giày EX.43"
                  onChange={(e) => setSizeName6(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số Lượng giày"
                  onChange={(e) => setNumber6(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Kích Cỡ giày EX.44"
                  onChange={(e) => setSizeName7(e.target.value)}
                />{" "}
                <input
                  type="number"
                  placeholder="Số Lượng giày"
                  onChange={(e) => setNumber7(e.target.value)}
                />
              </div>
            </div>

            <div className="product--discription">
              <DescriptionIcon />

              <textarea
                placeholder="Mô Tả Sản Phẩm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div className="name__price">
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Chọn danh mục</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>

              {/* <StorageIcon /> */}
              <input
                type="number"
                placeholder="Kho"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="name__price">
              <DiscountIcon />
              <input
                type="number"
                placeholder="Khuyến mãi (%)"
                onChange={(e) => setDiscount(e.target.value)}
              />

              {/* <BadgeIcon className="Icon--tagname"/> */}
              <input
                type="text"
                placeholder="Tên ảnh"
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
                onfocus="(this.type='date')"
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                id="file"
                name="files"
                accept="image/*"
                // onChange={createProductImagesChange}
                onChange={onChange}
                // onChange={(e) => setImages(e.target.files)}
                multiple
              />
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
              Thêm
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
