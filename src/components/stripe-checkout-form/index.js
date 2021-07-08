import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CARD_OPTIONS } from "../../utils/stripe";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/client";
import { useCart } from "../../contexts/cart/use-cart";
import Link from "next/link";

const StripeCheckoutForm = () => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [session] = useSession();
  const { cartItemsCount, calculatePrice, items, clearCart } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = (event) => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (inputdata, e) => {
    e.preventDefault();
    setProcessingTo(true);

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement("card");

    const postData = {
      name: inputdata.name,
      email: session.user.email,
      address: {
        city: inputdata.city,
        line1: inputdata.address,
        state: inputdata.state,
        postal_code: inputdata.zip,
        country: inputdata.country,
      },
      amount: calculatePrice(),
    };

    console.log(postData);

    try {
      const result = await fetch("/api/stripe-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const { clientSecret } = await result.json();
      console.log(clientSecret);

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: inputdata.name,
          email: session.user.email,
          address: {
            city: inputdata.city,
            line1: inputdata.address,
            state: inputdata.state,
            postal_code: inputdata.zip,
            country: inputdata.country,
          },
        },
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      } else {
        // // On successful payment, save records to database and redirect to confirmation page.
        const orderData = {
          order_number: "Kokelio_order_001",
          name: inputdata.name,
          email: session.user.email,
          address: {
            city: inputdata.city,
            line1: inputdata.address,
            state: inputdata.state,
            postal_code: inputdata.zip,
            contry: inputdata.country,
          },
          total_products: cartItemsCount,
          total_amount: calculatePrice(),
          product_details: items,
          payment_id: paymentMethodReq.paymentMethod.id,
        };

        const orders = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
        const ordersResponse = await orders.json();
        if ((ordersResponse.msg = "success")) {
          setProcessingTo(false);
          clearCart();
          router.push(
            `/payment/success?order=${ordersResponse.data.OrderNumber}`,
            {
              shallow: true,
            }
          );
        }
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return cartItemsCount > 0 ? (
    <div>
      <form
        method="POST"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="payment-form"
      >
        <p>Billing Details</p>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Card Holder Name"
            {...register("name", {
              required: "Card Holder Name is required",
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="City"
                {...register("city", {
                  required: "City Price is required",
                })}
              />
              {errors.city && <p>{errors.city.message}</p>}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="State"
                {...register("state", {
                  required: "State is required",
                })}
              />
              {errors.state && <p>{errors.state.message}</p>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="ZIP"
                {...register("zip", {
                  required: "ZIP Code is required",
                })}
              />
              {errors.zip && <p>{errors.zip.message}</p>}
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Country"
                {...register("country", {
                  required: "Country is required",
                })}
              />
              {errors.country && <p>{errors.country.message}</p>}
            </div>
          </div>
        </div>

        <hr />
        <p>Card Details</p>
        <div className="form-group">
          <CardElement
            options={CARD_OPTIONS}
            onChange={handleCardDetailsChange}
          />
        </div>
        <div className="text-center">
          <button
            className="blue-button"
            type="submit"
            disabled={isProcessing || !stripe}
          >
            {isProcessing ? "Processing..." : `PAY $ ${calculatePrice()}`}
          </button>
        </div>
      </form>
      {checkoutError ? (
        <div style={{ color: "red" }}>{checkoutError}</div>
      ) : null}
    </div>
  ) : (
    <div className="hv-center">
      <p>Your shopping cart is empty , Please add items in your Cart </p>
      <Link href="/shop">
        <a className="blue-button">Goto Shop Page</a>
      </Link>
    </div>
  );
};

export default StripeCheckoutForm;
