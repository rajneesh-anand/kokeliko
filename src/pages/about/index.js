import React from "react";
import ScrollToTop from "../../components/scroll-to-top";
import SEO from "../../components/seo";
import AboutService from "../../containers/about/about-service";
import TeamContainer from "../../containers/about/team";
import PageTitleContainer from "../../containers/global/page-title";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import Layout from "../../layout";

const AboutPage = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="About | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/about"}
        />
        <div className="wrapper about-page-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <PageTitleContainer />
            <AboutService />
            <TeamContainer />
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default AboutPage;
