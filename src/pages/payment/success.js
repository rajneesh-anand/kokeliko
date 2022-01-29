import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layout/footer";
import Header from "../../layout/header";
import Layout from "../../layout";
import prisma from "../../libs/prisma";
import Table from "react-bootstrap/Table";
import { useCart } from "../../contexts/cart/use-cart";

const Success = ({ data }) => {
  console.log(JSON.parse(data));
  const { data: session, status } = useSession();
  const orderData = JSON.parse(data);
  const ProductDetails = JSON.parse(orderData.ProductDetails);
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Layout>
      <SEO
        title="Payment Status "
        canonical={process.env.PUBLIC_URL + "/payment/success"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="row" style={{ textAlign: "center" }}>
              <p>
                Thank you for placing an order, your order number =
                {orderData.OrderNumber}
              </p>
            </div>

            <div className="row">
              <Table striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ProductDetails.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={product.image} alt={product.name} />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="row" style={{ textAlign: "right" }}>
              <h6>Total Amount = {orderData.TotalAmount}</h6>
            </div>
            <div className="row" style={{ textAlign: "center" }}>
              <div>
                <Link href="/shop">
                  <a className="blue-button">Buy More</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  try {
    const { order } = context.query;
    const result = await prisma.orders.findFirst({
      where: {
        OrderNumber: order,
      },
    });
    return {
      props: { data: JSON.stringify(result) },
    };
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    return {
      props: {},
    };
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

export default Success;
