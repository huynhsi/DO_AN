import axios from "axios";
import {
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
  NEW_COUPON_RESET,
  CLEAR_ERRORS,
} from "../constants/couponConstants";

// Create Product
export const createCoupon = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COUPON_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/coupon/new`,
      couponData,
      config
    );

    dispatch({
      type: NEW_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
