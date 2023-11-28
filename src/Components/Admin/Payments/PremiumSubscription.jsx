import NotificationImage from "../../../images/EmailNotification.png";
import ReportImage from "../../../images/Report.png";
import CheckoutForm from "./CheckoutForm";

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
    <div className=" mt-8">
      <div className=" flex justify-center">
        <SubscriptionCard
          title="Premium 👑"
          price="$500 DOP/mes"
          features={premiumFeatures}
        />
      </div>
      <div className=" mt-6 flex justify-center space-x-3">
        <div className=" w-[25rem]">
          <p className="mb-3 text-center text-base font-semibold text-gray-700">
            Notificacion de Cambio de Precio
          </p>
          <img src={NotificationImage} alt="notificationImage" />
        </div>
        <div className=" w-[25rem]">
          <p className="mb-3 text-center text-base font-semibold text-gray-700">
            Reportes Personalizado
          </p>
          <img src={ReportImage} alt="reportImage" />
        </div>
      </div>
      <div className=" mt-4">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default PremiumSubscription;
