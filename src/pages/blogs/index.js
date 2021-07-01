import React from "react";
import BlogContainer from "../../containers/blog/blog-grid";
// import PageTitleContainerTwo from "../../containers/global/page-title-two";
import ScrollToTop from "../../components/scroll-to-top";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const BlogsPage = ({ blogData }) => {
  return (
    <Layout>
      <SEO
        title="Blog | Victoria Studio "
        canonical={process.env.PUBLIC_URL + "/blogs"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          {/* <PageTitleContainerTwo subTitle="Blogs" title="Write &amp; Share" /> */}
          <BlogContainer blogData={blogData} />
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  // Fetch the first page as default
  const page = query.page || 1;
  let blogData = null;
  // Fetch data from external API
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/blog?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    blogData = await res.json();
    // console.log(blogData);
  } catch (err) {
    blogData = { error: { message: err.message } };
  }
  // Pass data to the page via props
  return { props: { blogData } };
};

export default BlogsPage;
