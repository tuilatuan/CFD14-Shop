import axiosInstance from "../utils/axiosInstance";

export const subscribesService = {
  subscribes(payload = {}) {
    return axiosInstance.post(`/subscribes`, payload);
  },
  subscribesDeals(payload = {}) {
    return axiosInstance.post(`/subscribes/deals`, payload);
  },
};
