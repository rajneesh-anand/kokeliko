import React from "react";
import ScrollToTop from "../components/scroll-to-top";
import SEO from "../components/seo";
import QuteContainer from "../containers/global/global-qute";
import PortfolioContainer from "../containers/global/portfolio";
import IntroContainer from "../containers/home/intro";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Layout from "../layouts";

const HomePage = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="Victoria Studio – Photography"
          canonical={process.env.PUBLIC_URL}
        />
        <div className="wrapper home-default-wrapper">
          <Header />
          <IntroContainer />
          <div className="main-content">
            <QuteContainer />
            <PortfolioContainer />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default HomePage;
