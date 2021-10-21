import PropTypes from "prop-types";
import React from "react";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";
import BlogDetailsContainer from "../containers/blog/blog-details";
import BlogData from "../data/blog.json";
import Footer from "../layout/footer";
import Header from "../layout/header/index";
import Layout from "../layout/index";

const BlogDetails = ({
  match: {
    params: { id },
  },
}) => {
  const blogId = parseInt(id, 10);
  const data = BlogData.filter((blog) => blog.id === blogId);
  return (
    <React.Fragment>
      <Layout>
        <SEO title="Alexis || Blog Details" />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <BlogDetailsContainer data={data[0]} />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

BlogDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export default BlogDetails;
