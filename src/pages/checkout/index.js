import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "../../components/stripe-checkout-form";
import { useSession } from "next-auth/client";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const StripeCheckout = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const [session, loading] = useSession();

  return loading ? (
    <div className="hv-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : !session ? (
    <Layout>
      <SEO
        title={" Checkout | KokeLiko"}
        canonical={`${process.env.PUBLIC_URL}/checkout`}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="hv-center">
            <p>Please Sign In to Buy the Product </p>
            <Link href="/auth/signin">
              <a className="blue-button">Sign In</a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  ) : (
    <Layout>
      <SEO
        title="Checkout | KokeLiko "
        canonical={process.env.PUBLIC_URL + "/checkout"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <Elements stripe={stripePromise}>
                  <StripeCheckoutForm />
                </Elements>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

// export async function getServerSideProps({ params, req, res }) {
//   try {
//     const { id } = params;

//     const post = await prisma.product.findFirst({
//       where: {
//         id: Number(id),
//       },
//     });
//     console.log(post);
//     return {
//       props: { data: JSON.stringify(post) },
//     };
//   } catch (error) {
//     console.log(error);
//     res.statusCode = 404;
//     return {
//       props: {},
//     };
//   } finally {
//     async () => {
//       await prisma.$disconnect();
//     };
//   }
// }
export default StripeCheckout;
