import React from "react";
import Link from "next/link";
import htmr from "htmr";

const BlogDetails = ({ data }) => {
  const fomatDate = (date_value) => {
    let date = new Date(date_value);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  return (
    <div className="blog-details-area ptb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="blog-details-desc">
              <div className="article-image">
                <Link href="/">
                  <a className="tag">{data.category}</a>
                </Link>
                <img src={data.image} alt="blog-details" />
              </div>

              <div className="article-content">
                <div className="entry-meta">
                  <ul>
                    <li>
                      <i className="ri-calendar-2-line"></i>
                      {fomatDate(data.createdAt)}
                    </li>
                    {/* <li>
                        <i className="ri-message-2-line"></i>
                        <Link href="/blog-details">
                          <a>(4) Comments</a>
                        </Link>
                      </li> */}
                  </ul>
                </div>

                <h4>{data.title}</h4>
                {htmr(data.content)}
              </div>

              <div className="article-footer">
                <div className="post-author-meta">
                  <div className="d-flex align-items-center">
                    <img src={data.author.image} alt="user" />
                    <div className="title">
                      <span className="name">
                        Author : <small>{data.author.name}</small>
                      </span>
                      {/* <span className="date">March 17, 2021</span> */}
                    </div>
                  </div>
                </div>
                <div className="article-share">
                  <ul className="social">
                    <li>
                      <span>Share:</span>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        className="facebook"
                        target="_blank"
                      >
                        <i className="ri-facebook-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/"
                        className="twitter"
                        target="_blank"
                      >
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/"
                        className="linkedin"
                        target="_blank"
                      >
                        <i className="ri-twitter-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        className="instagram"
                        target="_blank"
                      >
                        <i className="ri-instagram-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
