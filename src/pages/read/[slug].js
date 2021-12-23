import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Layout from "@/layout/index";
import BlogDetail from "@/components/blog/blog-details";
import prisma from "@libs/prisma";

const SingleBlogPage = ({ data }) => {
  const blogData = data ? JSON.parse(data) : null;
  return (
    <Layout>
      <SEO
        title={`${blogData.title}`}
        description="Explore the world of Yoga and Meditation"
        canonical={`${process.env.PUBLIC_URL}/read/${blogData.slug}`}
      />
      <div className="wrapper">
        <Header />
        <BlogDetail data={blogData} />
        <Footer />
      </div>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//     },
//   });
//   const paths = posts.map((post) => ({
//     params: { slug: post.slug },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
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
    props: { data: post ? JSON.stringify(post) : null },
  };
}

export default SingleBlogPage;
