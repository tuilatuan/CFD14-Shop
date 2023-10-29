import axiosInstance from "../utils/axiosInstance";

export const productService = {
  getProducts(query = "") {
    return axiosInstance.get(`/products${query}`);
  },
  getProductDetail(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getProductsBySlug(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getCate(query = "") {
    return axiosInstance.get(`/product-categories${query}`);
  },
  getCatebySlug(slug = "") {
    return axiosInstance.get(`/product-categories/${slug}`);
  },
  getProductReview(id = "", query = "") {
    return axiosInstance.get(`/reviews/product/${id}${query}`);
  },
};
