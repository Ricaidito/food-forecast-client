const SubscriptionCard = ({ title, price, features }) => {
  return (
    <div className="max-w-sm overflow-hidden rounded-[10px] border border-lime-900 border-opacity-25 bg-lime-500 bg-opacity-5 p-6 shadow-lg">
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

const Subscription = () => {
  const freeFeatures = [
    "Acceso al catálogo de productos y precios",
    "Comparaciones básicas de mercado",
    "Alertas de precios estándar",
    "Análisis semanal de tendencias",
  ];

  const premiumFeatures = [
    "Todas las características de la versión gratuita",
    "+ Acceso a reportes avanzados y análisis detallados",
    "+ Notificaciones personalizadas de cambios de precios",
    "+ Soporte prioritario al cliente",
  ];

  return (
    <div className="pt-32 text-center">
      <h2 className="mb-12 text-2xl font-bold text-zinc-800">
        Planes y precios
      </h2>
      <div className="flex flex-col justify-center gap-10 px-5 md:flex-row">
        <SubscriptionCard
          title="Básico"
          price="Gratis"
          features={freeFeatures}
        />
        <SubscriptionCard
          title="Premium 👑"
          price="$500 DOP/mes"
          features={premiumFeatures}
        />
      </div>
    </div>
  );
};

export default Subscription;
