import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "../../components/stripe-checkout-form";

import { useSession } from "next-auth/client";
import Link from "next/link";
import SEO from "../../components/seo";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { useCart } from "../../contexts/cart/use-cart";

import {
  MessageBox,
  MessageTitle,
  AnchorButton,
} from "../../components/messagebox";

const StripeCheckout = () => {
  const router = useRouter();
  const { cartItemsCount } = useCart();
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
  );
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session) {
      window.localStorage.setItem("callback-origin", window.location.pathname);
      router.push("/auth/signin");
    }
  }, []);

  return loading ? (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    session && (
      <Layout>
        <SEO
          title="Checkout | KokeLiko "
          canonical={process.env.PUBLIC_URL + "/checkout"}
        />
        <div className="wrapper">
          <Header classOption="hb-border" />
          <div className="container">
            {cartItemsCount > 0 ? (
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm />
              </Elements>
            ) : (
              <MessageBox>
                <MessageTitle>
                  Your shopping cart is empty , Please add items in your cart
                </MessageTitle>
                <Link href="/shop">
                  <AnchorButton>Goto Shop Page</AnchorButton>
                </Link>
              </MessageBox>
            )}
          </div>
          <Footer />
        </div>
      </Layout>
    )
  );
};

export default StripeCheckout;
