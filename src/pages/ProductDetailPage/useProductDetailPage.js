import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productServider";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../../store/reducers/cartReducer";
import tokenMethod from "../../utils/token";
import { handleShowModal } from "../../store/reducers/authReducer";
import { handleAddProductWishList } from "../../store/reducers/wishlistReducer";

const useProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productsId } = useParams();
  const { wishlist } = useSelector((state) => state.wishlist);
  const colorRef = useRef();
  const quantityRef = useRef();

  const { data: productDetailData } = useQuery(
    () => productService.getProductDetail(productsId),
    [productsId]
  );
  console.log("productDetailData :>> ", productDetailData);
  const { id, name, description, shippingReturn, price, discount } =
    productDetailData || {};
  const { data: productDetailReviews } = useQuery(
    () => id && productService.getProductReview(id),
    [id]
  );
  const isAddedWishlist = useMemo(() => {
    return wishlist?.some((product) => product.id === id);
  }, [wishlist, id]);
  const handleAddToCart = () => {
    if (tokenMethod.get()) {
      const { value: color, reset: colorReset } = colorRef.current || {};
      const { value: quantity, reset: quantityReset } = quantityRef.current || {};

      if (!color) {
        message.error("Please select color");
        return;
      } else if (isNaN(quantity) && quantity < 1) {
        message.error("Quantity must be greater than 1");
        return;
      }
      const addPayload = {
        addedId: id,
        addedColor: color,
        addedQuantity: quantity,
        addedPrice: price - discount,
      };

      try {
        const res = dispatch(handleAddCart(addPayload)).unwrap();
        if (res) {
          colorReset?.();
          quantityReset?.();
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    {
      dispatch(handleShowModal());
    }
  };

  const handleAddToWishList = () => {
    const payload = {
      product: id,
    };
    dispatch(handleAddProductWishList(payload));
  };

  const productDetailTopProps = {
    ...productDetailData,
    reviews: productDetailReviews,
    colorRef,
    isAddedWishlist,
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
