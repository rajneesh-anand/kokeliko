import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import ProductList from "@/components/product/product-list";
import Message from "@/components/message";
import Loading from "@/components/loading";
import { getProducts } from "@/utils/getProducts";

const ShopPage = ({ products }) => {
  console.log(products);

  return (
    <Layout>
      <SEO
        title="Shop | Kokeliko"
        description="Explore the world of Yoga and Meditation"
        canonical={`${process.env.PUBLIC_URL}/shop`}
      />
      <div className="wrapper">
        <Header />
        {products.length > 0 ? (
          <ProductList data={products} />
        ) : (
          <Message
            title="There's no product available at this time !"
            url="/"
            btnText="Go Back to Home Page"
          />
        )}
        <Footer />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
}

export default ShopPage;
