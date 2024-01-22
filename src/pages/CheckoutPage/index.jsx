import React from "react";
import CheckoutDiscount from "./CheckoutDiscount";
import CheckoutForm from "./CheckoutForm";
import { Link } from "react-router-dom";
import PATHS from "../../constants/path";
import Breadcrumb from "../../components/Breadcrumb";
import useDiscountPage from "./useDiscountPage";

const CheckoutPage = () => {
  const { couponProps, checkoutFormProps } = useDiscountPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <CheckoutDiscount {...couponProps} />
            <CheckoutForm {...checkoutFormProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
