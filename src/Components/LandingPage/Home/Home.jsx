import BgImage from "../../../images/BgImage.png";
import FoodForecastLogo from "../../../images/LogoFoodForecast.png";

const Home = () => {
  return (
    <div
      className="h-[661px] bg-cover"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="grid justify-items-center pt-[9rem]">
        <img src={FoodForecastLogo} alt="Food Forecast Logo" className="p-6" />
        <div>
          <p className="text-center text-2xl font-bold text-white">
            ¡Somos Food Forecast!
          </p>
        </div>
        <div>
          <p className="w-[532px] pt-2 text-center text-lg font-normal leading-relaxed text-white">
            Somos un equipo innovador dedicado a simplificar la comparación de
            precios de alimentos. En Food Forecast, combinamos tecnología
            avanzada y análisis de mercado para ofrecerte reportes actualizados
            y notificaciones de precios. Nuestro compromiso es proporcionarte
            las herramientas necesarias para que tomes decisiones de compra
            inteligentes y económicas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
