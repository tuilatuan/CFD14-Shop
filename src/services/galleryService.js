import axiosInstance from "../utils/axiosInstance";

export const galleryService = {
  getGalleryBySlug(Slug = "") {
    return axiosInstance.get(`/galleries/${Slug}`);
  },
  getGallery() {
    return axiosInstance.get(`/galleries`);
  },
};
