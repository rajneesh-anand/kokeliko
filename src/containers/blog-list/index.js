import React, { useEffect, useState } from "react";
import BlogFilter from "../../components/blog/blog-filter";
import BlogCardMain from "../../components/blog-card-main";
import useMasonry from "../../hooks/use-masonry";
import Router, { useRouter } from "next/router";
import Loading from "components/loading";
import { slugify } from "../../utils";

const BlogList = ({ data }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    if (data) {
      // Error check
      if (data.error) {
        // Handle error
      } else {
        setBlogs(data.data);
      }
    }
  }, [data]);

  // Router event handler
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
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
    // To get page offset of last user
    const lastUserLoaded = document.querySelector(
      ".portfolio-list > .masonry-grid:last-child"
    );
    if (lastUserLoaded) {
      const lastUserLoadedOffset =
        lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastUserLoadedOffset) {
        if (data.curPage < data.maxPage && !loading) {
          const query = router.query;
          query.page = parseInt(data.curPage) + 1;
          router.push({
            pathname: router.pathname,
            query: query,
          });
        }
      }
    }
  };

  const { categories } = useMasonry(
    blogs,
    ".portfolio-list",
    ".masonry-grid",
    ".messonry-button",
    ".messonry-button button"
  );

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="messonry-button text-center mb-8">
            <BlogFilter categories={categories} />
          </div>
        </div>
      </div>

      <div className="row portfolio-list">
        {blogs.map((item) => (
          <div
            key={item.id}
            className={`col masonry-grid  ${item.subCategories
              .map((cat) => slugify(cat))
              .join(" ")}`}
          >
            <BlogCardMain data={item} />
          </div>
        ))}
      </div>

      {loading && <Loading />}
    </>
  );
};

export default BlogList;
