import React from "react";
import Pagination from "../../components/Pagiantion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogSkeletonStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 5%;
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
            const { name, image, description, slug, author } = blogItem;

            return (
              <div className="entry-item col-sm-6" key={index}>
                <article className="entry entry-grid">
                  <figure className="entry-media">
                    <a href="blog-single.html">
                      <img src={image} alt={name} />
                    </a>
                  </figure>
                  <div className="entry-body">
                    <div className="entry-meta">
                      <span>Nov 22, 2018</span>
                      <span className="meta-separator">|</span>
                      <span className="entry-author">
                        {" "}
                        by <a href="#">{author}</a>
                      </span>
                    </div>
                    <h2 className="entry-title">
                      <a href="blog-single.html">{name}</a>
                    </h2>
                    <div className="entry-content">
                      <p>
                        Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                        luctus, metus. Phasellus ultrices nulla quis nibh. Quisque
                        lectus. Donec consectetuer ...
                      </p>
                      <Link href="blog-single.html" className="read-more">
                        Read More
                      </Link>
                    </div>
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
