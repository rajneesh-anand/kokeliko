import React from "react";
import { useSession, getSession } from "next-auth/react";
import prisma from "@/libs/prisma";
import Link from "next/link";
import SEO from "@/components/seo";
import Message from "@/components/message";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import OrderList from "@/components/order/order-list";
import EmptyBox from "@/styles/icons/EmptyBox";

const OrderPage = ({ orderData }) => {
  const data = JSON.parse(orderData).length != 0 ? JSON.parse(orderData) : null;
  return (
    <Layout>
      <SEO
        title="My Orders  "
        canonical={`${process.env.PUBLIC_URL}/user/orders`}
      />
      <div className="wrapper">
        <Header />

        <div className="container">
          <div className="row">
            {data ? (
              <OrderList data={data} />
            ) : (
              <div className="info text-center">
                <EmptyBox />
                <Message
                  title="You have no orders !"
                  url="/shop"
                  btnText="Buy Product"
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

  const orders = await prisma.orders.findMany({
    where: {
      Email: session.user.email,
    },
  });
  return {
    props: {
      orderData:
        orders.length != 0 ? JSON.stringify(orders) : JSON.stringify([]),
    },
  };
};

export default OrderPage;
