import axios from "axios";
import {
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
  NEW_COUPON_RESET,
  ALL_COUPON_REQUEST,
  ALL_COUPON_SUCCESS,
  ALL_COUPON_FAIL,
  ALL_COUPON_RESET,
  SINGLE_COUPON_SUCCESS,
  SINGLE_COUPON_REQUEST,
  SINGLE_COUPON_FAIL,
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
// get all coupon
export const getAllCoupon = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COUPON_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/coupons`);

    dispatch({ type: ALL_COUPON_SUCCESS, payload: data.coupon });
  } catch (error) {
    dispatch({ type: ALL_COUPON_FAIL, payload: error.response.data.message });
  }
};

//get Single Coupon
export const getSingleCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_COUPON_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/coupons/${id}`);

    dispatch({ type: SINGLE_COUPON_SUCCESS, payload: data.coupon });
  } catch (error) {
    dispatch({
      type: SINGLE_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
