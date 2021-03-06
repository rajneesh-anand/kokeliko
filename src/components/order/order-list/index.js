import React, { useState, useEffect } from "react";
import Link from "next/link";
import htmr from "htmr";

const OrderList = ({ data }) => {
  const fomatDate = (date_value) => {
    let date = new Date(date_value);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const truncate = (str, no_words) => {
    return htmr(str.split(" ").splice(0, no_words).join(" ") + "  ... ...");
  };

  return (
    <div className="blog-area ptb-50">
      <div className="container">
        <div className="row justify-content-center">
          {data &&
            data.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="single-blog-post">
                  <div className="image">
                    <Link href={`/read/${item.slug}`}>
                      <a className="d-block">
                        <img src={item.image} alt="blog" />
                      </a>
                    </Link>
                    <Link href={`/read/${item.slug}`}>
                      <a className="tag">{item.category}</a>
                    </Link>
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li>
                        <i className="ri-calendar-2-line"></i>
                        {fomatDate(item.createdAt)}
                      </li>
                      <li>
                        <i className="ri-time-line"></i>
                        <span>5 Mins</span>
                      </li>
                    </ul>
                    <h3>
                      <Link href={`/read/${item.slug}`}>
                        <a>{item.title}</a>
                      </Link>
                    </h3>

                    <div>{truncate(item.content, 35)}</div>
                  </div>
                  <div className="read-more">
                    <Link href={`/read/${item.slug}`}>
                      <a className="default-btn-sm">Read More</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
