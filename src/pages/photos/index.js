import Image from "next/image";
import React, { useState, useEffect } from "react";
import PortfolioContainer from "../../containers/global/photos";
import SEO from "../../components/seo";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import Layout from "../../layout";

export default function Photos() {
  return (
    <Layout>
      <SEO
        title="Photo Gallery | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/photos"}
      />
      <div className="wrapper home-default-wrapper">
        <Header />
        <div className="main-content">
          <div className="container">
            <PortfolioContainer />
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
