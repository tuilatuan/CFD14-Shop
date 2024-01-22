import React, { useMemo } from "react";
import styled from "styled-components";
import PATHS from "../../constants/path";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { formatCurrency } from "../../utils/format";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../../store/reducers/cartReducer";
import { handleAddProductWishList } from "../../store/reducers/wishlistReducer";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { id, slug, title, price, rating, images, discount, color } = product || {};
  const productPath = PATHS.PRODUCT.INDEX + `/${slug}`;

  const isAddedWishlist = useMemo(() => {
    return wishlist?.some((product) => product.id === id);
  }, [wishlist, id]);

  const _onAddtoCart = (e) => {
    e?.preventDefault();

    const addPayload = {
      addedId: id,
      addedColor: color?.[0] || "",
      addedQuantity: 1,
      addedPrice: price - discount,
    };
    dispatch(handleAddCart(addPayload));
  };
  const _onAddToWishlist = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const payload = {
      product: id,
    };
    dispatch(handleAddProductWishList(payload));
  };

  const addedStyle = {
    backgroundColor: isAddedWishlist ? "#ef837b" : "#fcb941",
  };
  return (
    <div className="product product-2">
      <figure className="product-media">
        {discount > 0 && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
        <Link to={productPath} style={{ height: 275 }}>
          {images?.length > 0 ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty
                description="There is no product "
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <a
            style={addedStyle}
            href="#"
            onClick={_onAddToWishlist}
            className="btn-product-icon btn-wishlist btn-expandable"
          >
            <span style={addedStyle}>
              {isAddedWishlist ? "Added" : "Add"} to wishlist
            </span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            role="button"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={_onAddtoCart}
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={productPath}>{title || ""}</Link>
        </h3>
        <div className="product-price">
          {discount ? (
            <>
              {" "}
              <span className="new-price">${formatCurrency(price - discount)}</span>
              <span className="old-price">Was ${formatCurrency(price)}</span>{" "}
            </>
          ) : (
            <>${formatCurrency(price || 0)}</>
          )}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div className="ratings-val" style={{ width: `${(rating || 0) * 20}%` }} />
          </div>
          <span className="ratings-text">( {rating} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
