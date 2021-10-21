import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogList from "@/components/blog/blog-list";
import Message from "@/components/message";
import Loading from "@/components/loading";
import { usePaginatedData } from "@/utils/useRequest";

const ArticlePage = ({ articleType }) => {
  const {
    result,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    isEmpty,
  } = usePaginatedData(`${process.env.PUBLIC_URL}/api/articles/${articleType}`);

  return (
    <Layout>
      <SEO
        title={`${articleType[0].toUpperCase()}${articleType.slice(
          1
        )} | KokeLiko`}
        description="Explore the world of Yoga and Meditation"
        canonical={`${process.env.PUBLIC_URL}/articles/${articleType}`}
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

export default ArticlePage;

export const getServerSideProps = async ({ params }) => {
  const articleType = params.type;
  return {
    props: { articleType },
  };
};
