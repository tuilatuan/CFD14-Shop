import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/path";

const CheckoutSuccessPage = () => {
  return (
    <main className="main">
      <div className="content-success text-center">
        <div className="container">
          <h1 className="content-title">Your Order is Completed!</h1>
          <p>
            Your order <strong>646db21c106cc616ed3d221b</strong> has been completed. Your
            order details are shown for your personal accont.{"{"}" "{"}"}
          </p>
          <Link
            to={PATHS.DASHBOARD}
            className="btn btn-outline-primary-2 btn-minwidth-lg"
          >
            <span>VIEW MY ORDERS</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
