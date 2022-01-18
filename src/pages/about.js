import React from "react";
import SEO from "@/components/seo";
import AboutPageDetails from "@/components/about";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About Tswan "
        description="Explore more about Transcendental Meditation"
        canonical={`${process.env.PUBLIC_URL}/about`}
      />
      <div className="wrapper">
        <Header />
        <AboutPageDetails />
        <Footer />
      </div>
    </Layout>
  );
};

export default AboutPage;
