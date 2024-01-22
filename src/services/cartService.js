import axiosInstance from "../utils/axiosInstance";

export const cartService = {
  getCart() {
    return axiosInstance.get(`/carts/me`);
  },
  updateMyCart(payload = {}) {
    return axiosInstance.put(`/carts`, payload);
  },
};
