import NotificationImage from "../../../images/EmailNotification.png";
import ReportImage from "../../../images/Report.png";
import CheckoutForm from "./CheckoutForm";
import stripeLogo from "../../../images/stripe_logo.png";

const PremiumSubscription = () => {
  return (
    <div className=" mt-1">
      <div className="m-0 p-0 pt-2 text-center">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-800 md:text-6xl">
            ¡Adquiere tu plan
            <span className="text-yellow-300"> Premium!</span>
          </h1>
          <p className="text-base text-gray-600 md:text-lg">
            Accede a funciones adicionales en nuestra platafoma.
          </p>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div>
          <div className="flex justify-center">
            <p className="text-center text-xl font-bold text-green-600">
              Por solo $500 DOP pesos al mes
            </p>
          </div>
          <div className=" mt-6 flex justify-center space-x-3">
            <div className=" w-[25rem]">
              <p className="mb-3 text-center text-base font-bold text-gray-700">
                Notificaciones de cambio de precios
              </p>
              <img src={NotificationImage} alt="notificationImage" />
            </div>
            <div className=" w-[25rem]">
              <p className="mb-3 text-center text-base font-bold text-gray-700">
                Reportes personalizados
              </p>
              <img src={ReportImage} alt="reportImage" />
            </div>
          </div>
        </div>

        <div className="container m-12 w-max rounded-[10px] border border-lime-900 border-opacity-25 px-6 py-20 text-start shadow-lg">
          <p className="mb-3 text-center text-xl font-bold text-green-600">
            Adquirir suscripción
          </p>
          <div className=" flex justify-center">
            <div>
              <img
                src={stripeLogo}
                alt="stripeLogo"
                style={{
                  width: "20rem",
                }}
              />
            </div>
          </div>
          <p>
            Adquiere tu suscripción realizando el pago digital con Stripe, de
            manera segura y sin transacciones fantamas. Cancela en cualquier
            momento.
          </p>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscription;
