import moment from "moment";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../constants/path";

const SideBar = ({ tagsData, blogTypeArray, searchCate, blogPopular }) => {
  const navigate = useNavigate();
  const Tags = tagsData?.blogs || {};

  const _onSubmit = (cate, e) => {
    // e?.preventDefault();
    searchCate?.(cate);
  };
  return (
    <aside className="col-lg-3">
      <div className="sidebar">
        <div className="widget widget-search">
          <h3 className="widget-title">Search</h3>
          <form action="#">
            <label htmlFor="ws" className="sr-only">
              Search in blog
            </label>
            <input
              type="search"
              className="form-control"
              name="ws"
              id="ws"
              placeholder="Search in blog"
              required
            />
            <button type="submit" className="btn">
              <i className="icon-search" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="widget widget-cats">
          <h3 className="widget-title">Categories</h3>
          <ul>
            {blogTypeArray &&
              blogTypeArray?.map((item, index) => {
                return (
                  <li key={index}>
                    <a href="#">
                      {item.name} <span>{item.count}</span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="widget">
          <h3 className="widget-title">Popular Posts</h3>
          <ul className="posts-list">
            {blogPopular &&
              blogPopular?.map((item, index) => {
                const { name, image, createdAt, slug } = item || {};
                const formatDate = moment(createdAt).format("MMM DD, YYYY");
                const blogPath = PATHS.BLOG.INDEX + `/${slug}`;

                return (
                  <li key={index}>
                    <figure>
                      <Link to={blogPath}>
                        <img src={image} alt={name} />
                      </Link>
                    </figure>
                    <div>
                      <span>{formatDate}</span>
                      <h4>
                        <Link to={blogPath}>{name}</Link>
                      </h4>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="widget widget-banner-sidebar">
          <div className="banner-sidebar-title">ad box 280 x 280</div>
          <div className="banner-sidebar banner-overlay">
            <a href="#">
              <img src="/assets/images/blog/sidebar/banner.jpg" alt="banner" />
            </a>
          </div>
        </div>
        <div className="widget">
          <h3 className="widget-title">Browse Tags</h3>
          <div className="tagcloud">
            {Tags?.length > 0 ? (
              Tags.map((tag, index) => {
                return (
                  <Link key={index} onClick={() => _onSubmit(tag.name)}>
                    {tag.name}
                  </Link>
                );
              })
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
