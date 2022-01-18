import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogList from "@/components/blog/blog-list";
import Loading from "@/components/loading";

const HomePage = ({ blogsData }) => {
  return (
    <Layout>
      <SEO
        title="Tswan"
        description="Explore the world of Yoga and Meditation"
        canonical={`${process.env.PUBLIC_URL}`}
      />
      <div className="wrapper">
        <Header />
        {blogsData ? (
          blogsData.data.length > 0 && <BlogList blogListData={blogsData} />
        ) : (
          <Loading />
        )}
        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;

  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/blogs?page=${page}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    const result = await res.json();

    return { props: { blogsData: result.data.length > 0 ? result : null } };
  } catch (err) {
    console.log(err.message);
    return { props: { blogsData: null } };
  }
};

export default HomePage;
