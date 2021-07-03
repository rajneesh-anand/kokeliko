import React from "react";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";
import QuteContainer from "../containers/global/global-qute";
import PortfolioContainer from "../containers/global/portfolio";
import IntroContainer from "../containers/home/intro";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Layout from "../layouts";
import BlogList from "../containers/blog-list";

const HomePage = ({ blogData }) => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="KokeLiko – Photography"
          canonical={process.env.PUBLIC_URL}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <BlogList blogData={blogData} />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
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
export default HomePage;
