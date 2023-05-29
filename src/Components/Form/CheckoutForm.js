import { CreditCardIcon } from "@heroicons/react/24/solid";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getPaymentIntent, saveBooking } from "../../api/bookings";
import { updateBookingStatus } from "../../api/services";
import { getRole } from "../../api/user";
import { AuthContext } from "../../contexts/AuthProvider";
import SSLCommerz from "../Checkout/SSLCommerz";
import SmallSpinner from "../Spinner/SmallSpinner";

const CheckoutForm = ({ bookingData }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { price, guestName, guestEmail } = bookingData;
  console.log("bookingData", bookingData);

  const [role, setRole] = useState(null);
  useEffect(() => {
    getRole(user?.email).then((data) => {
      setRole(data);
    });
  }, [user]);

  useEffect(() => {
    getPaymentIntent(price).then((data) => {
      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setProcessing(true);
    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: guestName,
            email: guestEmail,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);

      //store payment on database
      const data = {
        transactionId: paymentIntent.id,
        ...bookingData,
      };
      saveBooking(data)
        .then((res) => res.json())
        .then((data) => {
          updateBookingStatus({ isBooked: true, id: bookingData?.home?.id });
          setProcessing(false);
          console.log(data);
          toast.success("Booking Successful!");
          navigate("/dashboard/bookings");
        })
        .catch((err) => {
          console.log(err);
          setProcessing(false);
        });
    }
  };
  return (
    <>
      <SSLCommerz bookingData={bookingData} />
      <hr className="w-1/2 my-9 text-gray-700" />
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold mb-7">
            Let's make your payment with Stripe
          </h1>
          <CreditCardIcon className="inline-block w-6 h-6 -mt-6" />
        </div>

        <form className="max-w-lg">
          <CardElement
            className="border p-4 rounded-md shadow-md"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          {cardError && (
            <p className="text-red-500 my-2 font-medium">{cardError}</p>
          )}
          <button
            onClick={handleSubmit}
            className={`${
              cardError ? "mt-2" : "mt-5"
            } font-medium bg-gradient-to-r from-sky-400 to-cyan-600 rounded-md text-white px-5 py-2`}
            type="submit"
            disabled={
              !stripe ||
              !clientSecret ||
              processing ||
              role === "admin" ||
              role === "host"
            }
          >
            {role === "admin" || role === "host" ? (
              "Signin to user account"
            ) : processing ? (
              <SmallSpinner />
            ) : (
              "Pay with Stripe"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
