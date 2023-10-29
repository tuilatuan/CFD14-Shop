import axiosInstance from "../utils/axiosInstance";

export const blogService = {
  getBlog() {
    return axiosInstance.get("/blogs");
  },
  getBlogDetail(slug = "") {
    return axiosInstance.get(`/blogs/${slug}`);
  },
  getBlogCate() {
    return axiosInstance.get(`/blog-categories`);
  },
  getBlogCatebySlug(slug = "") {
    return axiosInstance.get(`/blog-categories/${slug}`);
  },
  getBlogTags() {
    return axiosInstance.get(`/blog-tags`);
  },
  getBlogTagsbySlug(slug = "") {
    return axiosInstance.get(`/blog-tags/${slug}`);
  },
};
