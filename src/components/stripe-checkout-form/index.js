import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CARD_OPTIONS } from "../../utils/stripe";
import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/client";

const StripeCheckoutForm = ({ data }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [session, loading] = useSession();

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
      },
      amount: data.price,
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
      }

      // // On successful payment, redirect to thank you page.
      await Router.push("/payment/success");
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return (
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
            {isProcessing ? "Processing..." : `PAY $ ${data.price}`}
          </button>
        </div>
      </form>
      {checkoutError ? (
        <div style={{ color: "red" }}>{checkoutError}</div>
      ) : null}
    </div>
  );
};

export default StripeCheckoutForm;
