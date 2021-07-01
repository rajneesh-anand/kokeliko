import React from "react";
import { useSession, getSession } from "next-auth/client";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const Account = () => {
  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <SEO
          title="Payment Success | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/payment/success"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="text-center-black">
              <p>Please Sign In to view this page </p>
              <Link href="/auth/signin">
                <a>Sign In</a>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <SEO
        title="Payment Success | Victoria Studio "
        canonical={process.env.PUBLIC_URL + "/payment/success"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="hv-center">
              <p>Thank you for purchasing </p>
              <Link href="/shop">
                <a className="blue-button">Buy More</a>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Account;
