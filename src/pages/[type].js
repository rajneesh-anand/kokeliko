import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogList from "@/components/blog/blog-list";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import { blogCategoryOptions } from "@/constant/blogs";

const BlogCategoryPage = ({ blogData }) => {
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
        {blogData ? (
          blogData.data.length > 0 && <BlogList blogListData={blogData} />
        ) : (
          <Loading />
        )}
        <Footer />
      </div>
    </Layout>
  );
};

// export const getServerSideProps = async ({ query, params }) => {
//   const page = query.page || 1;
//   const type = params.type;

//   try {
//     const res = await fetch(
//       `${process.env.PUBLIC_URL}/api/category/${type}?page=${page}`
//     );
//     if (res.status !== 200) {
//       throw new Error("Failed to fetch");
//     }
//     const result = await res.json();
//     return { props: { blogData: result.data.length > 0 ? result : null } };
//   } catch (err) {
//     console.log(err.message);
//     return { props: { blogData: null } };
//   }
// };

export async function getStaticPaths() {
  const paths = blogCategoryOptions.map((category) => ({
    params: { type: category },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { type } = params;
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/category/${type}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    const result = await res.json();
    return { props: { blogData: result.data.length > 0 ? result : null } };
  } catch (err) {
    console.log(err.message);
    return { props: { blogData: null } };
  }
}

export default BlogCategoryPage;
