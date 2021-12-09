import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogList from "@/components/blog/blog-list";
import Message from "@/components/message";

import { useRouter } from "next/router";

const ArticlePage = ({ blogData }) => {
  const router = useRouter();
  const title = router.query.type;

  return (
    <Layout>
      <SEO
        title={`${
          title[0].toUpperCase() + title.slice(1).toLowerCase()
        } | KokeLiko`}
        description="Explore the world of Yoga and Meditation"
        canonical={`${process.env.PUBLIC_URL}/${title}`}
      />
      <div className="wrapper">
        <Header />
        {blogData.data.length > 0 ? (
          <BlogList blogListData={blogData} />
        ) : (
          <Message
            title="There's nothing here !"
            url="/user/post/create"
            btnText="Write &amp; Share Your Own Blog"
          />
        )}
        <Footer />
      </div>
    </Layout>
  );
};

export default ArticlePage;

export const getServerSideProps = async ({ query, params }) => {
  const page = query.page || 1;
  const type = params.type;

  try {
    const res = await fetch(
      `${process.env.PUBLIC_URL}/api/category/${type}?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    const result = await res.json();
    console.log(result);
    return { props: { blogData: result } };
  } catch (err) {
    console.log(err.message);
    return { props: { blogData: null } };
  }
};
