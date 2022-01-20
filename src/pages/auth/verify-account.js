import React from "react";
import SEO from "../../components/seo";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import Layout from "../../layout";

export default function AccountverifyPage() {
  return (
    <Layout>
      <SEO
        title="Email Verification "
        canonical={process.env.PUBLIC_URL + "/auth/verify-account"}
      />
      <div className="wrapper ">
        <Header />

        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3 style={{ fontWeight: "400", color: "green", marginBottom: 16 }}>
            We have sent a login verification link to registered email address !
          </h3>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
