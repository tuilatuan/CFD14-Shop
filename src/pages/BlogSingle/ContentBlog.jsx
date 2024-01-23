import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const ContentBlog = ({ blogDetailData, filteredData, ...blogData }) => {
  const { author, image, name, slug, tags, description, createdAt } =
    blogDetailData || {};

  const formatDate = moment(createdAt).format("MMM DD, YYYY");
  return (
    <div className="col-lg-9">
      <article className="entry single-entry">
        <div className="entry-body">
          <figure className="entry-media">
            <img src={image} alt={name} />
          </figure>
          <h1 className="entry-title entry-title-big">{name}</h1>
          <div className="entry-meta">
            <span>{formatDate}</span>
            <span className="meta-separator">|</span>
            <span className="entry-author">
              {" "}
              by <a href="#">{author}</a>
            </span>
          </div>
          <div
            className="entry-content editor-content"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
          <div className="entry-footer row no-gutters flex-column flex-md-row">
            <div className="col-md">
              <div className="entry-tags">
                <span>Tags:</span>
                {/* {filteredData?.map((item) => (
                  <Link>{item.name}</Link>
                ))} */}
              </div>
            </div>
            <div className="col-md-auto mt-2 mt-md-0">
              <div className="social-icons social-icons-color">
                <span className="social-label">Share this post:</span>
                <a
                  href="#"
                  className="social-icon social-facebook"
                  title="Facebook"
                  target="_blank"
                >
                  <i className="icon-facebook-f" />
                </a>
                <a
                  href="#"
                  className="social-icon social-twitter"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter" />
                </a>
                <a
                  href="#"
                  className="social-icon social-pinterest"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-pinterest" />
                </a>
                <a
                  href="#"
                  className="social-icon social-linkedin"
                  title="Linkedin"
                  target="_blank"
                >
                  <i className="icon-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
      <nav className="pager-nav" aria-label="Page navigation">
        <a
          className="pager-link pager-link-prev"
          href="blog-single.html"
          aria-label="Previous"
          tabIndex={-1}
        >
          {" "}
          Previous Post{" "}
          <span className="pager-link-title">Cras iaculis ultricies nulla</span>
        </a>
        <a
          className="pager-link pager-link-next"
          href="blog-single.html"
          aria-label="Next"
          tabIndex={-1}
        >
          {" "}
          Next Post <span className="pager-link-title">Praesent placerat risus</span>
        </a>
      </nav>
      <div className="related-posts">
        <h3 className="title">Related Posts</h3>
        <div
          className="owl-carousel owl-simple"
          data-toggle="owl"
          data-owl-options='{
                  "nav": false, 
                  "dots": true,
                  "margin": 20,
                  "loop": false,
                  "responsive": {
                      "0": {
                          "items":1
                      },
                      "480": {
                          "items":2
                      },
                      "768": {
                          "items":3
                      }
                  }
              }'
        >
          <article className="entry entry-grid">
            <figure className="entry-media">
              <a href="blog-single.html">
                <img
                  src="/assets/images/blog/grid/3cols/post-1.jpg"
                  alt="image desc"
                />
              </a>
            </figure>
            <div className="entry-body">
              <div className="entry-meta">
                <span>Nov 22, 2018</span>
                <span className="meta-separator">|</span>
                <span className="entry-author">
                  {" "}
                  by <a href="#">John Doe</a>
                </span>
              </div>
              <h2 className="entry-title">
                <a href="blog-single.html">Cras ornare tristique elit.</a>
              </h2>
            </div>
          </article>
          <article className="entry entry-grid">
            <figure className="entry-media">
              <a href="blog-single.html">
                <img
                  src="/assets/images/blog/grid/3cols/post-2.jpg"
                  alt="image desc"
                />
              </a>
            </figure>
            <div className="entry-body">
              <div className="entry-meta">
                <span>Nov 22, 2018</span>
                <span className="meta-separator">|</span>
                <span className="entry-author">
                  {" "}
                  by <a href="#">John Doe</a>
                </span>
              </div>
              <h2 className="entry-title">
                <a href="blog-single.html">Vivamus ntulla necante.</a>
              </h2>
            </div>
          </article>
          <article className="entry entry-grid">
            <figure className="entry-media">
              <a href="blog-single.html">
                <img
                  src="/assets/images/blog/grid/3cols/post-3.jpg"
                  alt="image desc"
                />
              </a>
            </figure>
            <div className="entry-body">
              <div className="entry-meta">
                <span>Nov 22, 2018</span>
                <span className="meta-separator">|</span>
                <span className="entry-author">
                  {" "}
                  by <a href="#">John Doe</a>
                </span>
              </div>
              <h2 className="entry-title">
                <a href="blog-single.html">Utaliquam sollicitudin leo.</a>
              </h2>
            </div>
          </article>
          <article className="entry entry-grid">
            <figure className="entry-media">
              <a href="blog-single.html">
                <img
                  src="/assets/images/blog/grid/3cols/post-4.jpg"
                  alt="image desc"
                />
              </a>
            </figure>
            <div className="entry-body">
              <div className="entry-meta">
                <span>Nov 22, 2018</span>
                <span className="meta-separator">|</span>
                <span className="entry-author">
                  {" "}
                  by <a href="#">John Doe</a>
                </span>
              </div>
              <h2 className="entry-title">
                <a href="blog-single.html">Fusce pellentesque suscipit.</a>
              </h2>
            </div>
          </article>
        </div>
      </div>
      <div className="comments">
        <h3 className="title">3 Comments</h3>
        <ul>
          <li>
            <div className="comment">
              <figure className="comment-media">
                <a href="#">
                  <img src="/assets/images/blog/comments/1.jpg" alt="User name" />
                </a>
              </figure>
              <div className="comment-body">
                <a href="#" className="comment-reply">
                  Reply
                </a>
                <div className="comment-user">
                  <h4>
                    <a href="#">Jimmy Pearson</a>
                  </h4>
                  <span className="comment-date">November 9, 2018 at 2:19 pm</span>
                </div>
                <div className="comment-content">
                  <p>
                    Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
                    sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut
                    justo. Suspendisse potenti.{" "}
                  </p>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <div className="comment">
                  <figure className="comment-media">
                    <a href="#">
                      <img
                        src="/assets/images/blog/comments/2.jpg"
                        alt="User name"
                      />
                    </a>
                  </figure>
                  <div className="comment-body">
                    <a href="#" className="comment-reply">
                      Reply
                    </a>
                    <div className="comment-user">
                      <h4>
                        <a href="#">Lena Knight</a>
                      </h4>
                      <span className="comment-date">
                        November 9, 2018 at 2:19 pm
                      </span>
                    </div>
                    <div className="comment-content">
                      <p>Morbi interdum mollis sapien. Sed ac risus.</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="comment">
              <figure className="comment-media">
                <a href="#">
                  <img src="/assets/images/blog/comments/3.jpg" alt="User name" />
                </a>
              </figure>
              <div className="comment-body">
                <a href="#" className="comment-reply">
                  Reply
                </a>
                <div className="comment-user">
                  <h4>
                    <a href="#">Johnathan Castillo</a>
                  </h4>
                  <span className="comment-date">November 9, 2018 at 2:19 pm</span>
                </div>
                <div className="comment-content">
                  <p>
                    Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                    dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                    dapibus eu, fermentum et, dapibus sed, urna.
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="reply">
        <div className="heading">
          <h3 className="title">Leave A Reply</h3>
          <p className="title-desc">
            Your email address will not be published. Required fields are marked *
          </p>
        </div>
        <form action="#">
          <label htmlFor="reply-message" className="sr-only">
            Comment
          </label>
          <textarea
            name="reply-message"
            id="reply-message"
            cols={30}
            rows={4}
            className="form-control"
            required
            placeholder="Comment *"
            defaultValue={""}
          />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="reply-name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="reply-name"
                name="reply-name"
                required
                placeholder="Name *"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="reply-email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="reply-email"
                name="reply-email"
                required
                placeholder="Email *"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary-2">
            <span>POST COMMENT</span>
            <i className="icon-long-arrow-right" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentBlog;
