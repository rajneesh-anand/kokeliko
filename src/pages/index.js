import React from "react";
import SEO from "components/seo";
import Footer from "layouts/footer";
import Header from "layouts/header";
import Layout from "layouts";
import BlogList from "containers/blog-list";
import Message from "components/message";

const HomePage = ({ blogData }) => {
  console.log(blogData);
  return (
    <Layout>
      <SEO title="KokeLiko | Home" canonical={process.env.PUBLIC_URL} />
      <div className="wrapper">
        <Header />
        <div className="container">
          {blogData.data.length > 0 ? (
            <BlogList data={blogData} />
          ) : (
            <Message
              title="No Post Available !"
              url="/user/newpost"
              btnText="Write &amp; Share Blog"
            />
          )}
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  // Fetch the first page as default
  const page = query.page || 1;
  let blogData = null;
  // Fetch data from external API
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/articles?page=${page}`
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch");
    }
    blogData = await res.json();
    console.log(blogData);
  } catch (err) {
    blogData = { error: { message: err.message } };
  }
  // Pass data to the page via props
  return { props: { blogData } };
};

export default HomePage;
