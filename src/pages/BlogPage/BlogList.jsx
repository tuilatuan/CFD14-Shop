import React from "react";
import Pagination from "../../components/Pagiantion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PATHS from "../../constants/path";
import moment from "moment";

const BlogSkeletonStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 5%;
`;

const ContentBlog = styled.div`
  display: -webkit-inline-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 1.3rem;
`;

const BlogList = ({ blogs, pagiProps, loadingBlog }) => {
  // const loading = useDebounce(loadingBlog, 30000);

  // console.log("object :>> ", loading);
  // if (!loading) {
  //   <div className="col-lg-9">
  //     <div className="entry-container max-col-2" data-layout="fitRows">
  //       {new Array(6).fill("").map((_, index) => {
  //         return (
  //           <BlogSkeletonStyle key={index} className="entry-item col-sm-6">
  //             <Skeleton.Image active style={{ width: "100%", height: 275 }} />
  //             <Skeleton.Input />
  //             <Skeleton.Input block />
  //           </BlogSkeletonStyle>
  //         );
  //       })}
  //     </div>
  //   </div>;
  // }
  return (
    <div className="col-lg-9">
      <div className="entry-container max-col-2" data-layout="fitRows">
        {blogs?.length > 0 ? (
          blogs?.map((blogItem, index) => {
            const { name, image, description, slug, author, createdAt } = blogItem;
            const blogPath = PATHS.BLOG.INDEX + `/${slug}`;
            const formatDate = moment(createdAt).format("MMM DD, YYYY");
            return (
              <div className="entry-item col-sm-6" key={index}>
                <article className="entry entry-grid">
                  <figure className="entry-media">
                    <Link to={blogPath}>
                      <img src={image} alt={name} />
                    </Link>
                  </figure>
                  <div className="entry-body">
                    <div className="entry-meta">
                      <span>{formatDate}</span>
                      <span className="meta-separator">|</span>
                      <span className="entry-author">
                        {" "}
                        by <a href="#">{author}</a>
                      </span>
                    </div>
                    <h2 className="entry-title">
                      <Link to={blogPath}>{name}</Link>
                    </h2>
                    <ContentBlog className="entry-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                      />
                    </ContentBlog>
                    <Link to={blogPath} className="read-more">
                      Read More
                    </Link>
                  </div>
                </article>
              </div>
            );
          })
        ) : (
          <p>nodata</p>
        )}
      </div>
      <Pagination {...pagiProps} />
    </div>
  );
};

export default BlogList;
