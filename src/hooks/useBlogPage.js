import React, { useEffect } from "react";
import { blogService } from "../services/blogService";
import useQuery from "./useQuery";
import useMutation from "./useMutation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import PATHS from "../constants/path";

const BLOG_LIMIT = 6;

const useBlogPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryObject = queryString.parse(search);

  const [_, setSearchParams] = useSearchParams();

  const {
    data: blogsAll,
    loading: loadingAll,
    error,
    fetch,
  } = useQuery(blogService.getBlog);

  const {
    data: blogsData,
    loading: loadingBlog,
    error: blogError,
    execute: fetchBlogs,
  } = useMutation((query) => blogService.getBlog(query || `?limit=${BLOG_LIMIT}`));

  const { data: tagsData, loading: loadingTag } = useQuery(blogService.getBlogTags);
  const blogs = blogsData?.blogs || [];
  const blogsPagi = blogsData?.pagination || {};
  let count = 0;
  const blogPopular =
    blogs.filter((item) => {
      if (item.isPopular && count < 4) {
        count++;
        return true;
      }
      return false;
    }) || {};

  useEffect(() => {
    fetchBlogs(search);
  }, [search]);

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: BLOG_LIMIT,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  //search theo srting
  const searchString = (searchString) => {
    updateQueryString({ ...queryObject, search: searchString });
  };

  //search theo cate
  const searchCate = (cateString) => {
    updateQueryString({ ...queryObject, category: cateString });
  };

  //

  //
  const onPaniChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: Number(blogsPagi.page || queryObject.page || 1),
    limit: Number(blogsPagi.limit) || 0,
    total: Number(blogsPagi.total),
    onPaniChange,
  };

  const blogTypesCount = blogsAll?.blogs.reduce((accumulator, blog) => {
    const blogType = blog.category.name;
    accumulator[blogType] = (accumulator[blogType] || 0) + 1;
    return accumulator;
  }, {});
  const blogTypeArray = blogTypesCount
    ? Object.entries(blogTypesCount).map(([name, count]) => ({ name, count }))
    : [];
  //BlogList
  const blogListData = {
    blogs,
    loadingBlog,
    pagiProps,
  };
  //SideBar
  const sideBarData = {
    tagsData,
    blogTypeArray,
    searchString,
    blogPopular,
    searchCate,
  };
  return {
    blogListData,
    sideBarData,
  };
};

export default useBlogPage;
