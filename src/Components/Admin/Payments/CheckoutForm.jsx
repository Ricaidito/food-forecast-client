import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useUserContext from "../../../Contexts/useUserContext";

const CheckoutForm = () => {
  const { userID } = useUserContext();
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
      return;
    }

    try {
      // Create customer
      const customerResponse = await axios.get(
        `http://localhost:8000/payments/create-customer/${userID}`
      );
      const customerId = customerResponse.data.customerId;

      // Subscribe the customer to the plan
      const subscriptionResponse = await axios.post(
        "http://localhost:8000/payments/create-subscription",
        {
          customerId,
          paymentMethodId: paymentMethod.id,
        }
      );

      // Handle subscription response
      const { latest_invoice } = subscriptionResponse.data;
      const { payment_intent } = latest_invoice;

      if (payment_intent) {
        const { client_secret, status } = payment_intent;

        if (status === "requires_action") {
          // Requires additional action (e.g., 3D Secure)
          const { error: confirmError } = await stripe.confirmCardPayment(
            client_secret
          );
          if (confirmError) {
            console.error(confirmError);
            return;
          }
        }

        console.log("Subscription successful!");
      }
    } catch (err) {
      console.error("Error during subscription:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Suscribirse
      </button>
    </form>
  );
};

export default CheckoutForm;
