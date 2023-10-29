import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  getOrderHistories() {
    return axiosInstance.get("/orders/me");
  },
  getOrderHistoriesbyId(slug = "") {
    return axiosInstance.get(`/orders/${id}/me`);
  },
  orderProduct(payload = "") {
    return axiosInstance.post("/orders", payload);
  },
  getOrderVoucher(slug = "") {
    return axiosInstance.get(`/orders/voucher/${slug}`);
  },
};
