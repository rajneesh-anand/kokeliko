import React, { useState } from "react";
import { getCsrfToken, getSession } from "next-auth/client";
import SignInForm from "@/components/signin-form";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";

const SignInPage = ({ csrfToken }) => {
  return (
    <Layout>
      <SEO
        title="Sign In | KokeLiko"
        description="Sign In to KokeLiko"
        canonical={`${process.env.PUBLIC_URL}/auth/signin`}
      />
      <div className="wrapper">
        <Header />
        <SignInForm csrfToken={csrfToken} />
        <Footer />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { csrfToken },
  };
}

export default SignInPage;
