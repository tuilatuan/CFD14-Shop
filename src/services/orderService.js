import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  getVoucher(id = "") {
    return axiosInstance.get(`/orders/voucher/${id}`);
  },
  getOrder() {
    return axiosInstance.get(`/orders/me`);
  },
  getOrderbyId(id = "") {
    return axiosInstance.get(`/orders/${id}/me`);
  },
  checkout(payload = "") {
    return axiosInstance.post("/orders", payload);
  },
};
