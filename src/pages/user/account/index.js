import React from "react";
import { useSession, getSession } from "next-auth/react";
import prisma from "@/libs/prisma";
import Link from "next/link";
import SEO from "@/components/seo";
import Message from "@/components/message";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import BlogListTwo from "@/components/blog/blog-list-two";

const AccountPage = ({ blogData }) => {
  const data = JSON.parse(blogData).length != 0 ? JSON.parse(blogData) : null;
  return (
    <Layout>
      <SEO
        title="My Account | Blogs "
        canonical={`${process.env.PUBLIC_URL}/user/account`}
      />
      <div className="wrapper">
        <Header />

        <div className="container">
          <div className="row">
            <div className="buttonList">
              <div className="text-center">
                <Link href="/user/post/create">
                  <a className="small-btn">Write New Blog</a>
                </Link>
                <Link href="/user/drafts">
                  <a className="small-btn">Un-Published Blogs</a>
                </Link>
                <Link href="/user/product/create">
                  <a className="small-btn">Sell Your Product</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            {data ? (
              <BlogListTwo data={data} />
            ) : (
              <div className="info">
                <Message
                  title="You have not published any blog !"
                  url="/user/post/create"
                  btnText="Write &amp; Share Your Own Blog"
                />
              </div>
            )}
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: {
      blogData: blogs.length != 0 ? JSON.stringify(blogs) : JSON.stringify([]),
    },
  };
};

export default AccountPage;
