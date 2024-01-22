import React, { useEffect } from "react";
import { orderService } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/path";
import { handleGetCart, updateCacheCart } from "../../store/reducers/cartReducer";

const useDiscountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartInfo } = useSelector((state) => state.cart);
  console.log("cartInfo :>> ", cartInfo);
  useEffect(() => {
    if (Array.isArray(cartInfo) || (cartInfo?.id && cartInfo?.product?.length < 1)) {
      message.config({ top: 80, duration: 3, maxCount: 1 });

      message.error("There are no product in cart. Please add products to cart");
      navigate(PATHS.PRODUCT);
    }
  }, [cartInfo]);

  const handleAddCoupon = async (coupon) => {
    try {
      const couponRes = await orderService.getVoucher(coupon);
      const couponInfo = couponRes?.data?.data;
      console.log("couponInfo :>> ", couponInfo);
      if (couponInfo) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: couponInfo.value || 0,
            discountCode: couponInfo.code || "",
            total: subTotal - (couponInfo.value || 0) + (shipping?.price || 0),
          })
        );
        message.success("Add voucher success");
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Addd voucher faild");
    }
  };
  const handleRemoveCoupon = () => {
    try {
      if (cartInfo.discountCode) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: 0,
            discountCode: "",
            total: subTotal + (shipping?.price || 0),
          })
        );
        message.success("Remove coupon success");
      }
      message.success("No coupon");
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Remove voucher faild");
    }
  };
  const couponProps = {
    addedCoupon: cartInfo.discountCode,
    handleAddCoupon,
    handleRemoveCoupon,
  };

  const handleCheckout = async (data) => {
    if (data) {
      const { formInfo, cartInfo } = data;
      console.log("formInfo :>> ", formInfo);
      const {
        firstName,
        phone,
        email,
        province,
        district,
        ward,
        street,
        note,
        paymentMethod,
      } = formInfo || {};
      const {
        product,
        subTotal,
        shipping,
        total,
        quantity,
        variant,
        totalProduct,
        discount,
        discountCode,
      } = cartInfo || {};
      const checkoutPayload = {
        address: {
          phone,
          email,
          fullName: firstName,
          street: `${street}, ${ward?.label || ""}, ${district?.label || ""}, ${
            province?.label || ""
          } `,
        },
        note,
        paymentMethod,
        shipping,
        variant,
        subTotal,
        total,
        product: product?.map((item) => item.id) || [],
        quantity,
        totalProduct,
        discount,
        discountCode,
      };
      console.log("checkoutPayload :>> ", checkoutPayload);
      try {
        const res = await orderService.checkout(checkoutPayload);
        if (res?.data?.data) {
          dispatch(handleGetCart());
          message.success("Checkout successfully!");
          navigate(PATHS.CHECKOUT_SUCCESS);
        } else {
          message.error("Checkout failed");
        }
      } catch (error) {
        message.error("Checkout failed");
      }
    }
  };
  const checkoutFormProps = {
    handleCheckout,
  };
  return { couponProps, checkoutFormProps };
};

export default useDiscountPage;
