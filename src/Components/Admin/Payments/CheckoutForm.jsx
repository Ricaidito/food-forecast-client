import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) console.error(error);
    else {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/payments/create-payment-intent",
          {
            amount: 1000, // e.g., $10.00
          }
        );

        const confirmResult = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: paymentMethod.id,
          }
        );

        if (confirmResult.error) {
          console.error(confirmResult.error);
        } else {
          console.log("Payment successful");
        }
      } catch (err) {
        console.error("Error making payment:", err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-lg rounded-md border p-8 shadow-md"
    >
      <div className="mb-4">
        <CardElement
          className="rounded-md border p-3 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          style={{
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className={`rounded-md bg-blue-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          !stripe ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        Pagar
      </button>
    </form>
  );
};

export default CheckoutForm;
