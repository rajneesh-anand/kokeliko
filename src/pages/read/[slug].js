import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Layout from "@/layout/index";
import BlogDetail from "@/components/blog/blog-details";

const SingleBlogPage = ({ blogDetail }) => {
  return (
    <Layout>
      <SEO
        title={`${blogDetail.title}`}
        description="Amazon Flipkart Other E-Commerce Seller Platforms News and Updates"
        canonical={`${process.env.PUBLIC_URL}/read/${blogDetail.slug}`}
      />
      <div className="wrapper">
        <Header />
        <BlogDetail data={blogDetail} />

        <Footer />
      </div>
    </Layout>
  );
};

export default SingleBlogPage;

export async function getServerSideProps({ params, req, res }) {
  const { slug } = params;
  const result = await fetch(`${process.env.PUBLIC_URL}/api/blog/${slug}`);
  const data = await result.json();
  return {
    props: { blogDetail: data ? data.data : null },
  };
}

export async function getServerSideProps({ params, req, res }) {
  try {
    const { slug } = params;
    const post = await prisma.post.findFirst({
      where: {
        slug: slug,
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
