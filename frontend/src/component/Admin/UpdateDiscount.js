import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import DiscountIcon from "@mui/icons-material/Discount";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  clearErrors,
  updateDiscount,
  getProductDetails,
} from "../../actions/productAction";
import { UPDATE_DISCOUNT_RESET } from "../../constants/productConstants";

const UpdateDiscount = () => {
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const alert = useAlert();
  let navigate = useNavigate();
  const { id } = useParams();

  const [discount, setDiscount] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setDiscount(product.discount);
      setDateStart(product.datestart);
      setDateEnd(product.dateend);
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
      alert.success("Cập nhật giảm giá thành công");
      navigate("/admin/discount");
      dispatch({ type: UPDATE_DISCOUNT_RESET });
    }
  }, [dispatch, alert, error, isUpdated, productId, product, updateError]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("discount", discount);
    myForm.set("datestart", dateStart);
    myForm.set("dateend", dateEnd);

    dispatch(updateDiscount(productId, myForm));
  };

  const setValueEmply = () => {
    setDiscount("");
    setDateStart("");
    setDateEnd("");
  };

  return (
    <Fragment>
      <MetaData title="Cập nhật giảm giá" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>CẬP NHẬT GIẢM GIÁ</h1>

              <div>
                <DiscountIcon />
                <input
                  type="number"
                  placeholder="% Giảm giá"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div>
                <DateRangeIcon />
                <input
                  type="date"
                  placeholder="Ngày bắt đầu"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                />
              </div>

              <div>
                <DateRangeIcon />
                <input
                  type="date"
                  placeholder="Ngày kết thúc"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                />
              </div>
              <Button id="createProductBtn" onClick={setValueEmply}>
                Xóa Khuyến Mãi
              </Button>
              <br />
              <Button id="createProductBtn" type="submit">
                Cập Nhật
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateDiscount;
