import PropTypes from "prop-types";
import React from "react";
import prisma from "../../lib/prisma";
import BlogDetailsContainer from "../../containers/blog/blog-details";
import BlogDetailsWithoutImage from "../../containers/blog/blog-details-image";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const BlogDetails = ({ data }) => {
  const result = JSON.parse(data);

  return (
    <Layout>
      <SEO
        title={result.title}
        canonical={`${process.env.PUBLIC_URL}/read/${result.id}/${result.slug}`}
      />
      <div className="wrapper">
        <Header />

        <div className="container">
          {result.template === "blogpost_with_thumbImage" ? (
            <BlogDetailsContainer data={result} />
          ) : (
            <BlogDetailsWithoutImage data={result} />
          )}
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

BlogDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export async function getServerSideProps({ params, req, res }) {
  try {
    const { id } = params;
    const post = await prisma.post.findFirst({
      where: {
        AND: [
          {
            id: Number(id[0]),
            slug: id[1],
          },
        ],
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

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

export default BlogDetails;
