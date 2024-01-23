import React from "react";
import { blogService } from "../../services/blogService";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import useBlogPage from "../../hooks/useBlogPage";

const useBlogDetailPage = () => {
  const dispatch = useDispatch();
  const { blogID } = useParams();
  const { sideBarData } = useBlogPage();

  const { data: blogDetailData } = useQuery(
    () => blogService.getBlogDetail(blogID),
    [blogID]
  );

  const { data: tagsData, loading: loadingTag } = useQuery(blogService.getBlogTags);
  const blogsTags = tagsData?.blogs;
  const { author, image, name, slug, tags, description, createdAt } =
    blogDetailData || {};
  const filteredData = {};

  const blogData = {
    blogDetailData,
    // filteredData,
  };

  return {
    blogData,
    sideBarData,
  };
};

export default useBlogDetailPage;
