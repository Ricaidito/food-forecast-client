import NotificationImage from "../../../images/EmailNotification.png";
import ReportImage from "../../../images/Report.png";
import CheckoutForm from "./CheckoutForm";
import stripeLogo from "../../../images/stripe_logo.png";

const SubscriptionCard = ({ title, price, features }) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 p-6 text-start shadow-lg">
      <h3 className="mb-4 text-center text-lg font-semibold text-green-600">
        {title}
      </h3>
      <p className="mb-4 text-center text-xl font-semibold text-gray-800">
        {price}
      </p>
      <ul className="mb-6">
        {features.map((feature, i) => (
          <li key={i} className="mb-3 text-base text-gray-700">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PremiumSubscription = () => {
  const premiumFeatures = [
    "Todas las características de la versión gratuita",
    "+ Acceso a reportes avanzados y análisis detallados",
    "+ Notificaciones personalizadas de cambios de precios",
    "+ Soporte prioritario al cliente",
  ];

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
            <SubscriptionCard
              title="Premium 👑"
              price="$500 DOP/mes"
              features={premiumFeatures}
            />
          </div>
          <div className=" mt-6 flex justify-center space-x-3">
            <div className=" w-[25rem]">
              <p className="mb-3 text-center text-base font-bold text-gray-700">
                ¡Notificaciones de cambio de precio!
              </p>
              <img src={NotificationImage} alt="notificationImage" />
            </div>
            <div className=" w-[25rem]">
              <p className="mb-3 text-center text-base font-bold text-gray-700">
                ¡Reportes personalizados!
              </p>
              <img src={ReportImage} alt="reportImage" />
            </div>
          </div>
        </div>

        <div className="m-4 w-max">
          <p className="mb-3 text-center text-base font-bold text-gray-700">
            Adquirir suscripción
          </p>
          <img
            src={stripeLogo}
            alt="stripeLogo"
            style={{
              height: "20rem",
              width: "48rem",
            }}
          />
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
