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
          <p className="text-center text-base font-medium text-white">
            ©2023 Food Forecast. Todos los derechos reservados.
          </p>
        </div>
        <div className=" grid justify-items-center pt-[3.87rem]">
          <div>
            <p className=" text-base font-medium text-white">
              Teléfono: +1 829-904-8054
            </p>
            <p className=" text-base font-medium text-white">
              Email: ricaiditodev@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
