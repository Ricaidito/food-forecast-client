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
      const customerResponse = await axios.get(
        `https://food-forecast-server.azurewebsites.net/payments/get-customer/${userID}`
      );
      const customerId = customerResponse.data.customerId;

      const subscriptionResponse = await axios.post(
        `https://food-forecast-server.azurewebsites.net/payments/create-subscription/${userID}`,
        {
          customerId,
          paymentMethodId: paymentMethod.id,
        }
      );

      const { latest_invoice } = subscriptionResponse.data;
      const { payment_intent } = latest_invoice;

      if (payment_intent) {
        const { client_secret, status } = payment_intent;

        if (status === "requires_action") {
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

  const cancelSubscription = async () => {
    try {
      const response = await axios.get(
        `https://food-forecast-server.azurewebsites.net/payments/cancel-subscription/${userID}`
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="subscription-form">
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Suscribirse
        </button>
      </form>
      <button onClick={cancelSubscription}>Cancelar suscripción</button>
    </div>
  );
};

export default CheckoutForm;
