import {
  CLEAR_ERRORS,
  NEW_COUPON_FAIL,
  NEW_COUPON_REQUEST,
  NEW_COUPON_RESET,
  NEW_COUPON_SUCCESS,
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
