import PropTypes from "prop-types";
import React from "react";
import prisma from "../../lib/prisma";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const ProductDetailsPage = ({ data }) => {
  const result = JSON.parse(data);

  return (
    <Layout>
      <SEO
        title={result.title}
        canonical={`${process.env.PUBLIC_URL}/product/${result.id}/${result.slug}`}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="container">
          <h1>{result.name}</h1>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

ProductDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export async function getServerSideProps({ params, req, res }) {
  try {
    const { id } = params;

    const post = await prisma.product.findFirst({
      where: {
        AND: [
          {
            id: Number(id[0]),
            slug: id[1],
          },
        ],
      },
    });
    console.log(post);
    return {
      props: { data: JSON.stringify(post) },
    };
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    return {
      props: {},
    };
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

export default ProductDetailsPage;
