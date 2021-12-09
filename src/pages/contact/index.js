import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";

const ContactPage = () => {
  return (
    <Layout>
      <SEO
        title="Contact | KokeLiko"
        description="Contact Us "
        canonical={`${process.env.PUBLIC_URL}/contact`}
      />
      <div className="wrapper">
        <Header />

        <Footer />
      </div>
    </Layout>
  );
};

export default ContactPage;
