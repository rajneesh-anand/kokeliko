import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogList from "@/components/blog/blog-list";
import Loading from "@/components/loading";

const HomePage = ({ blogData }) => {
  return (
    <Layout>
      <SEO
        title="Home | Kokeliko"
        description="Explore the world of Yoga and Meditation"
        canonical={`${process.env.PUBLIC_URL}`}
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

// export const getServerSideProps = async ({ query }) => {
//   const page = query.page || 1;

//   try {
//     const res = await fetch(`${process.env.PUBLIC_URL}/api/blogs?page=${page}`);
//     if (res.status !== 200) {
//       throw new Error("Failed to fetch");
//     }
//     const result = await res.json();
//     // console.log(result);
//     return { props: { blogData: result.data.length > 0 ? result : null } };
//   } catch (err) {
//     console.log(err.message);
//     return { props: { blogData: null } };
//   }
// };

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/bloglist`);
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

export default HomePage;
