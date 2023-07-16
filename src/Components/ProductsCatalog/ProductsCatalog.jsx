import "./ProductsCatalog.css";
import FoodForecastLogo from "../../images/LogoFoodForecast.png";
import ProfilePhoto from "../../images/ProfilePhoto.png";

const ProductsCatalog = () => {
  return (
    <div>
      <div>
        <nav className="bg-white">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a href="#">
              <img
                src={FoodForecastLogo}
                className="mr-3"
                alt="Flowbite Logo"
              />
            </a>
            <div>
              <a href="#">
                <img
                  src={ProfilePhoto}
                  className="w-10 h-10 rounded-full"
                  alt="ProfilePhoto"
                />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ProductsCatalog;
