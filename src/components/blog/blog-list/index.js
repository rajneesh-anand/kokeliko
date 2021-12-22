import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import htmr from "htmr";
import moment from "moment";
import Loading from "@components/loading";
import Image from "next/image";

const BlogList = ({ blogListData }) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const truncate = (str, no_words) => {
    return htmr(str.split(" ").splice(0, no_words).join(" ") + " ");
  };

  useEffect(() => {
    const masonryList = document.querySelector(".blogs-list");
    let Iso = new Isotope(masonryList, {
      itemSelector: ".masonry-grid",
    });
  }, [blogListData]);

  // Router event handler
  useEffect(() => {
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    return () => {
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const lastUserLoaded = document.querySelector(
      ".single-blog-post:last-child"
    );

    if (lastUserLoaded) {
      const lastUserLoadedOffset =
        lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastUserLoadedOffset) {
        if (blogListData.curPage < blogListData.maxPage && !loading) {
          const query = router.query;
          query.page = parseInt(blogListData.curPage) + 1;
          router.push({
            pathname: router.pathname,
            query: query,
          });
        }
      }
    }
  };

  return (
    <div className="blog-area">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-3 blogs-list mb-n30">
          {blogListData.data.map((item, index) => (
            <div key={index} className="col masonry-grid mb-30">
              <div className="single-blog-post">
                {item.image && (
                  <div className="image">
                    <Image
                      src={item.image}
                      width={204}
                      height={208}
                      layout="responsive"
                    />
                    <Link href={`/read/${item.slug}`}>
                      <a className="tag">{item.category}</a>
                    </Link>
                  </div>
                )}
                <div className="content">
                  <h1>
                    <Link href={`/read/${item.slug}`}>
                      <a>{item.title}</a>
                    </Link>
                  </h1>
                  <ul className="meta">
                    <li>
                      <i className="ri-calendar-2-line"></i>
                      {moment(item.createdAt).format("Do MMMM YYYY")}
                    </li>
                    <li>
                      <i className="ri-time-line"></i>
                      <span>5 Mins</span>
                    </li>
                  </ul>

                  <div>{truncate(item.content, 40)}</div>
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
      {loading && <Loading />}
    </div>
  );
};

export default BlogList;
