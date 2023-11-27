import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useUserContext from "../../../Contexts/useUserContext";
import { useUserConfigContext } from "../../../Contexts/UserConfigContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { userID } = useUserContext();
  const stripe = useStripe();
  const elements = useElements();
  const { refetchUserConfig } = useUserConfigContext();
  const navigate = useNavigate();

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
        refetchUserConfig();
        navigate("/admin");
      }
    } catch (err) {
      console.error("Error during subscription:", err);
    }
  };

  return (
    <div className=" mt-10">
      <form
        onSubmit={handleSubmit}
        className="subscription-form mx-auto mt-8 max-w-sm"
      >
        <div>
          <CardElement />
        </div>
        <div className=" mt-3 flex justify-center">
          <button
            className=" mt-4 h-9 w-[7rem] rounded-md bg-lime-600 font-medium text-white shadow hover:bg-white hover:text-lime-600 hover:shadow-lg"
            type="submit"
            disabled={!stripe}
          >
            Suscribirse
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
