import { useRef } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productServider";
import { message } from "antd";

const useProductDetailPage = () => {
  const { productsId } = useParams();

  const colorRef = useRef();
  const quantityRef = useRef();

  const { data: productDetailData } = useQuery(
    () => productService.getProductDetail(productsId),
    [productsId]
  );
  const { id, name, description, shippingReturn } = productDetailData || {};
  const { data: productDetailReviews } = useQuery(
    () => id && productService.getProductReview(id),
    [id]
  );

  const handleAddToCart = () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quantity, reset: quantityReset } = quantityRef.current || {};

    if (!color) {
      message.error("Please select color");
      return;
    } else if (isNaN(quantity) && quantity < 1) {
      message.error("Quantity must be greater than 1");
      return;
    }
    colorReset?.();
    quantityReset?.();
  };

  const handleAddToWishList = () => {
    console.log("handleAddToWishList");
  };

  const productDetailTopProps = {
    ...productDetailData,
    reviews: productDetailReviews,
    colorRef,
    quantityRef,
    handleAddToCart,
    handleAddToWishList,
  };

  const productDetailTabProps = {
    description,
    shippingReturn,
    reivews: productDetailReviews,
  };
  return {
    productName: name,
    productDetailTopProps,
    productDetailTabProps,
  };
};

export default useProductDetailPage;
