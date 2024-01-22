import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/path";
import { handleDeleteProductWishList } from "../../store/reducers/wishlistReducer";
import { formatCurrency, getImageURL } from "../../utils/format";
import styled from "styled-components";
import { Empty, Modal } from "antd";

const EmptyWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
  console.log("wishlist :>> ", wishlist);
  const _onAddToCart = (product) => {
    navigate(PATHS.PRODUCT + "/" + product.slug);
  };

  const _onConfirmRemoveFromWishlist = async (productId) => {
    const payload = {
      product: productId,
    };
    dispatch(handleDeleteProductWishList(payload));
  };

  const _onRemoveFromWishlist = (product) => {
    const { confirm } = Modal;
    const { name, id } = product;
    confirm({
      title: "Do you want remove this item from wishlist?",
      content: <p>{name}</p>,
      onOk() {
        _onConfirmRemoveFromWishlist(id);
      },
      onCancel() {
        console.log("Cancle");
      },
    });
  };
  return (
    <div
      className="tab-pane fade show active"
      id="tab-wishlist"
      role="tabpanel"
      aria-labelledby="tab-wishlist-link"
    >
      <table className="table table-wishlist table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {!!!wishlist?.length && (
            <tr>
              <EmptyWrapper colSpan={3}>
                <Empty description="There is no product" />
              </EmptyWrapper>
            </tr>
          )}
          {!!wishlist?.length &&
            wishlist.map((item, index) => {
              const { id, slug, name, images, price, stock } = item || {};
              return (
                <tr key={item?.id || index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <a href="#">
                          <img src={getImageURL(images[0])} alt={name} />
                        </a>
                      </figure>
                      <h3 className="product-title">
                        <a href="#">{name}</a>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">${formatCurrency(price)}</td>
                  <td className="stock-col text-center">
                    {stock > 0 ? (
                      <span className="in-stock">In stock</span>
                    ) : (
                      <span className="out-of-stock">Out stock</span>
                    )}
                  </td>
                  <td className="action-col">
                    {stock > 0 ? (
                      <button
                        onClick={() => _onAddToCart(item)}
                        className="btn btn-block btn-outline-primary-2"
                      >
                        <i className="icon-cart-plus" />
                        Add to Cart{" "}
                      </button>
                    ) : (
                      <button className="btn btn-block btn-outline-primary-2 disabled">
                        Out of stock
                      </button>
                    )}
                  </td>
                  <td className="remove-col">
                    <button
                      onClick={() => _onRemoveFromWishlist(item)}
                      className="btn-remove"
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default WishList;
