import React, { useEffect } from "react";
import { blogService } from "../../services/blogService";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";

const BLOG_LIMIT = 6;

const useBlogPage = () => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);

  const [_, setSearchParams] = useSearchParams();

  const {
    data: blogsData,
    loading: loadingBlog,
    error: blogError,
    execute: fetchBlogs,
  } = useMutation((query) => blogService.getBlog(query || `?limit=${BLOG_LIMIT}`));

  const { data: tagsData, loading: loadingTag } = useQuery(blogService.getBlogTags);
  const blogs = blogsData?.blogs || [];
  const blogsPagi = blogsData?.pagination || {};

  //   console.log(" blogsData:>> ", blogsData);

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

  const onPaniChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: Number(blogsPagi.page || queryObject.page || 1),
    limit: Number(blogsPagi.limit) || 0,
    total: Number(blogsPagi.total),
    onPaniChange,
  };

  const blogTypesCount = blogs?.reduce((accumulator, blog) => {
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
  };
  return {
    blogListData,
    sideBarData,
  };
};

export default useBlogPage;
