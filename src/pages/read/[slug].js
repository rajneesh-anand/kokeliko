import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Layout from "@/layout/index";
import BlogDetail from "@/components/blog/blog-details";

const SingleBlogPage = ({ blogDetail }) => {
  // console.log(blogDetail);
  return (
    <Layout>
      <SEO
        title={`${blogDetail.title}`}
        description="Explore the world of Yoga and Meditation"
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

export async function getStaticPaths() {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/bloglist`);
  const posts = await res.json();
  const paths = posts.data.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const result = await fetch(`${process.env.PUBLIC_URL}/api/blog/${slug}`);
  const data = await result.json();
  return {
    props: { blogDetail: data ? data.data : null },
  };
}

export default SingleBlogPage;
