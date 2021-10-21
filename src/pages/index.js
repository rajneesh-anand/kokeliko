import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogList from "@/containers/blog-list";
import Message from "@/components/message";
import Loading from "@/components/loading";
import { usePaginatedData } from "@/utils/useRequest";

const HomePage = () => {
  const {
    result,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    isEmpty,
  } = usePaginatedData("/api/blogs");

  return (
    <Layout>
      <SEO
        title="Home | Kokeliko"
        description="Explore the world of Yoga and Meditation"
        canonical={`${process.env.PUBLIC_URL}`}
      />
      <div className="wrapper">
        <Header />

        {isLoadingMore ? (
          <Loading />
        ) : isEmpty ? (
          <Message
            title="Nothing found here !"
            url="/user/newpost"
            btnText="Write &amp; Share Your Own Blog"
          />
        ) : (
          <>
            <BlogList data={result} />
            <div className="row">
              <div className="col d-flex justify-content-center">
                {!isReachingEnd && (
                  <button
                    className="default-btn"
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                  >
                    {isLoadingMore ? "Loading..." : "More Blogs"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        <Footer />
      </div>
    </Layout>
  );
};

export default HomePage;
