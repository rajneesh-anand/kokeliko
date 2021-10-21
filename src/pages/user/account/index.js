import React from "react";
import { useSession, getSession } from "next-auth/client";
import prisma from "@/libs/prisma";
import Link from "next/link";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogListTwo from "@/components/blog/blog-list-two";

const AccountPage = ({ blogData }) => {
  const [session, loading] = useSession();
  const data = JSON.parse(blogData).length != 0 ? JSON.parse(blogData) : null;
  return (
    <Layout>
      <SEO
        title="My Account | KokeLiko "
        canonical={`${process.env.PUBLIC_URL}/user/account`}
      />
      <div className="wrapper">
        <Header />

        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-2 buttonList">
              <div>
                <Link href="/user/post/create">
                  <div className="buttonCol">
                    <a>Write New Blog</a>
                  </div>
                </Link>
                <Link href="/user/drafts">
                  <div className="buttonCol">
                    <a>Drafts Blog</a>
                  </div>
                </Link>
                <Link href="/user/upload/photo">
                  <div className="buttonCol">
                    <a>Upload Photo</a>
                  </div>
                </Link>
                <Link href="/user/upload/video">
                  <div className="buttonCol">
                    <a>Upload Movie</a>
                  </div>
                </Link>
                <Link href="/user/product">
                  <div className="buttonCol">
                    <a>Upload Product</a>
                  </div>
                </Link>
              </div>
            </div>

            <div className="col-lg-10 col-md-10 ">
              {data ? (
                <BlogListTwo data={data} />
              ) : (
                <div className="hv-center">
                  <h6>Write &amp; Share your blog with the world </h6>
                  <Link href="/user/newpost">
                    <a className="blue-button">Publish Your Blog</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const blogs = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: {
      blogData: blogs.length != 0 ? JSON.stringify(blogs) : JSON.stringify([]),
    },
  };
};

export default AccountPage;
