import React from "react";
import ShopContainer from "../../containers/shop/shop-grid";

import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const ShopPage = ({ shopData }) => {
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
            <ShopContainer shopData={shopData} />
          </div>
          <Footer />
       
        </div>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  let shopData = null;

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/shop?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }

    shopData = await res.json();
  } catch (err) {
    shopData = { error: { message: err.message } };
  }

  return { props: { shopData } };
};

export default ShopPage;
