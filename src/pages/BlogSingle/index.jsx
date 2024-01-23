import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import PATHS from "../../constants/path";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import ContentBlog from "./ContentBlog";
import useBlogDetailPage from "./useBlogDetailPage";
import useBlogPage from "../../hooks/useBlogPage";

const BlogSinglePage = () => {
  const { blogData, sideBarData } = useBlogDetailPage();

  return (
    <main className="main">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.BLOG}>Blog</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <ContentBlog {...blogData} />
            <SideBar {...sideBarData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogSinglePage;
