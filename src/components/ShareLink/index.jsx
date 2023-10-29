import React from "react";
import {
  FacebookShareButton,
  InstapaperShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";

const ShareLink = ({ path, title, type, children }) => {
  switch (type) {
    case "twitter":
      return (
        <TwitterShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </TwitterShareButton>
      );
    case "pinterest":
      return (
        <PinterestShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </PinterestShareButton>
      );

    case "instagram":
      return (
        <InstapaperShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </InstapaperShareButton>
      );

    default:
      <FacebookShareButton url={path}>
        <a href="#" className="social-icon" title={title} target="_blank">
          {children}
        </a>
      </FacebookShareButton>;
  }
};

export default ShareLink;
