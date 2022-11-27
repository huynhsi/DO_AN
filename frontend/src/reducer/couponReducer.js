import {
  CLEAR_ERRORS,
  NEW_COUPON_FAIL,
  NEW_COUPON_REQUEST,
  NEW_COUPON_RESET,
  NEW_COUPON_SUCCESS,
  ALL_COUPON_REQUEST,
  ALL_COUPON_SUCCESS,
  ALL_COUPON_FAIL,
  ALL_COUPON_RESET,
} from "../constants/couponConstants";

export const newCouponReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case NEW_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_COUPON_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        coupon: action.payload,
      };
    case NEW_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_COUPON_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allCouponReducer = (state = { coupon: [] }, action) => {
  switch (action.type) {
    case ALL_COUPON_REQUEST:
      return {
        loading: true,
      };

    case ALL_COUPON_SUCCESS:
      return {
        loading: false,
        coupon: action.payload,
      };

    case ALL_COUPON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
