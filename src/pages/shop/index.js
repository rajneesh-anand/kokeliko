import React from "react";
import ShopContainer from "../../containers/shop/shop-grid";
// import PageTitleContainerTwo from "../containers/global/page-title-two";
import ScrollToTop from "../../components/scroll-to-top";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const ShopPage = () => {
  return (
    <React.Fragment>
      <Layout>
        <SEO
          title="Shop | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/shop"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="container">
              <ShopContainer />
            </div>
          </div>
          <Footer />
          <ScrollToTop />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default ShopPage;
