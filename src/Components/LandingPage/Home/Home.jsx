import "./Home.css";
import BgImage from "../../../images/BgImage.png";

const Home = () => {
  return (
    <div
      className="h-[661px] bg-cover"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="pt-[9rem] grid justify-items-center">
        <div>
          <p className="text-center text-white text-xl font-bold">
            ¡Somos FoodForecast!
          </p>
        </div>
        <div>
          <p className="w-[532px] pt-2 text-center text-white text-sm font-normal leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque id risus sed augue porta bibendum. Phasellus erat ex,
            feugiat tempus porttitor id, consectetur a erat. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Nam maximus, nunc eu auctor finibus, erat tortor
            congue lorem, malesuada varius mi mauris ut lorem. Quisque aliquam,
            ex quis pulvinar iaculis, dolor tortor ullamcorper ligula, sit amet
            mollis lectus ipsum eget mauris. Maecenas vel eros fringilla,
            ullamcorper tellus sed, consequat velit. Ut in lobortis erat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
