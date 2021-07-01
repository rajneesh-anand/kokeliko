import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "../../components/stripe-checkout-form";
import prisma from "../../lib/prisma";
import { useSession, getSession } from "next-auth/client";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";

const StripeCheckout = ({ data }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const result = JSON.parse(data);
  console.log(result);
  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <SEO
          title="Checkout | Victoria Studio "
          canonical={process.env.PUBLIC_URL + "/checkout"}
        />
        <div className="wrapper home-default-wrapper">
          <Header classOption="hb-border" />
          <div className="main-content">
            <div className="text-center-black">
              <p>Please Sign In to Buy the Product </p>
              <Link href="/auth/signin">
                <a>Sign In</a>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Checkout | Victoria Studio "
        canonical={process.env.PUBLIC_URL + "/checkout"}
      />
      <div className="wrapper home-default-wrapper">
        <Header classOption="hb-border" />
        <div className="main-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-6 col-md-6 col-lg-6">
                <Elements stripe={stripePromise}>
                  <StripeCheckoutForm data={result} />
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

export async function getServerSideProps({ params, req, res }) {
  try {
    const { id } = params;

    const post = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
    console.log(post);
    return {
      props: { data: JSON.stringify(post) },
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
export default StripeCheckout;
