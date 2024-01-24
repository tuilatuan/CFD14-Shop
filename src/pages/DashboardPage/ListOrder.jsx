import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/format";

const ListOrder = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { orders } = profile || {};
  console.log("orders :>> ", orders);
  return (
    <div
      className="tab-pane fade show active"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
    >
      {orders?.length > 0 ? (
        <table className="table table-cart table-mobile">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => {
                const { total, quantity, product } = order || {};

                return product.map((item, indexProduct) => {
                  const { slug, id, images, price, name } = item || {};
                  const detailPath = PATHS.PRODUCT.INDEX + `/${slug}`;
                  let imagePath = images?.[0];
                  if (imagePath?.split("https")?.length > 2) {
                    imagePath = imagePath?.split("https");
                    imagePath = "https" + imagePath[2];
                  }
                  return (
                    <tr key={indexProduct}>
                      <td className="product-col">
                        <div className="product">
                          <figure className="product-media">
                            <Link to={detailPath}>
                              <img src={imagePath} alt={name} />
                            </Link>
                          </figure>
                          <h3 className="product-title">
                            <a href="#">{name}</a>
                          </h3>
                        </div>
                      </td>
                      <td className="price-col text-center">
                        ${formatCurrency(item.price)}
                      </td>
                      <td className="quantity-col text-center">
                        {quantity[indexProduct]}
                      </td>
                      <td className="total-col text-center">
                        ${formatCurrency(item.price * quantity[indexProduct])}{" "}
                      </td>
                    </tr>
                  );
                });
              })}
          </tbody>
        </table>
      ) : (
        <>
          <p>No order has been made yet.</p>
          <Link to={PATHS.HOME} className="btn btn-outline-primary-2">
            <span>GO SHOP</span>
            <i className="icon-long-arrow-right" />
          </Link>
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default ListOrder;
