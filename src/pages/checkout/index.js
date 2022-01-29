import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "@/components/stripe-checkout-form";
import { getSession } from "next-auth/react";
import SEO from "@/components/seo";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Layout from "@/layout/index";
import { useCart } from "@/contexts/cart/use-cart";
import Message from "@/components/message";

const StripeCheckout = () => {
  const { cartItemsCount } = useCart();
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
  );

  return (
    <Layout>
      <SEO
        title="Checkout | KokeLiko "
        canonical={`${process.env.PUBLIC_URL}/checkout`}
      />
      <div className="wrapper">
        <Header />
        <div className="container">
          {cartItemsCount > 0 ? (
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm />
            </Elements>
          ) : (
            <Message
              title="Your shopping cart is empty , Please add items in your cart"
              url="/shop"
              btnText="Goto Shop Page"
            />
          )}
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default StripeCheckout;

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

  return {
    props: {},
  };
}
