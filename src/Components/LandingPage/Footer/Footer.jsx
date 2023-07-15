import "./Footer.css";
import FooterLogo from "../../../images/FoodForecastFooterImage.png";

const Footer = () => {
  return (
    <div className="h-44 bg-lime-600">
      <div className="grid grid-cols-3 grid-rows-1">
        <div className=" grid justify-items-center pt-[3.5rem]">
          <div>
            <img src={FooterLogo} alt="FooterLogo" />
          </div>
        </div>
        <div className=" pt-[4.5rem]">
          <p className="text-center text-white text-base font-medium">
            ©2023 Food Forecast. Todos los derechos reservados.
          </p>
        </div>
        <div className=" grid justify-items-center pt-[3.87rem]">
          <div>
            <p className=" text-white text-base font-medium">
              Tel: 809-765-3212
            </p>
            <p className=" text-white text-base font-medium">
              info@foodforecast.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
