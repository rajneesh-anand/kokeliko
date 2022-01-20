import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import Link from "next/link";
export default function AccountErrorPage() {
  return (
    <Layout>
      <SEO
        title="Error - Email Verification "
        canonical={process.env.PUBLIC_URL + "/auth/error"}
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
          <h3 style={{ fontWeight: "400", color: "red", marginBottom: 16 }}>
            Oops something went wrong !
          </h3>

          <Link href="/auth/signin">
            <a className="small-btn"> Try Again </a>
          </Link>
        </div>

        <Footer />
      </div>
    </Layout>
  );
}
