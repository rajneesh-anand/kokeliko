import React from "react";
import { useSession, getSession } from "next-auth/client";
import prisma from "../../../libs/prisma";
import Link from "next/link";
import SEO from "../../../components/seo";
import Footer from "../../../layout/footer";
import Header from "../../../layout/header";
import Layout from "../../../layout";
// import ScrollToTop from "../../../components/scroll-to-top";
import DraftCardLeftImage from "../../../components/draft-card";

const Drafts = ({ blogData }) => {
  const [session, loading] = useSession();
  const data = JSON.parse(blogData).length != 0 ? JSON.parse(blogData) : null;

  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : !session ? (
    <Layout>
      <SEO
        title="Drafts List | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/user/drafts"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="hv-center">
            <p>Please SignIn To Access Your Account </p>
            <Link href="/auth/signin">
              <a>Sign In</a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO
        title="Drafts List | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/user/drafts"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-xs-6 buttonList">
                <div>
                  <Link href="/user/newpost">
                    <div className="buttonCol">
                      <a>Write New Blog</a>
                    </div>
                  </Link>
                  <Link href="/user/account">
                    <div className="buttonCol">
                      <a>Published Blog</a>
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
                  <DraftCardLeftImage data={data} />
                ) : (
                  <div className="hv-center">
                    <h6>
                      There is nothing in draft list ! Write &amp; Share your
                      Blog
                    </h6>
                    <Link href="/user/newpost">
                      <a className="blue-button">Publish Your Blog</a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {/* <ScrollToTop /> */}
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
      published: false,
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
export default Drafts;
