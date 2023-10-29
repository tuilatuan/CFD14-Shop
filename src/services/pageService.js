import axiosInstance from "../utils/axiosInstance";

export const pageService = {
  getPages() {
    return axiosInstance.get("/pages");
  },
  getPagesDataByName(name, slug = "") {
    return axiosInstance.get(`/pages/${name}${slug}`);
  },
};
