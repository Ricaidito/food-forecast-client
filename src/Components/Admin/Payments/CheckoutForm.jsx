import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      const result = await fetch(
        "http://localhost:8000/payments/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000, // e.g., $10.00
          }),
        }
      );
      const data = await result.json();
      const confirmResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmResult.error) {
        console.error(confirmResult.error);
      } else {
        console.log("Payment successful");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default CheckoutForm;
