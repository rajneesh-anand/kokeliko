import React from "react";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

export default function AccountverifyPage() {
  return (
    <Layout>
      <SEO
        title="Email Verification | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/auth/verify-account"}
      />
      <div className="wrapper ">
        <Header />
        <div className="container">
          <div className="hv-center">
            <h3>
              We have sent a verification link to registered email address.
            </h3>
            <h2>Kindly login to your email and verify. Thank You </h2>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
