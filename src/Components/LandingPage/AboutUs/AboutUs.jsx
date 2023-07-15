import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="h-[668px] w-auto bg-opacity-25 bg-lime-600">
      <div className="pt-[11.06rem] grid justify-items-center">
        <div className="">
          <p className="text-center text-stone-950 text-xl font-bold">
            Sobre nosotros
          </p>
        </div>
        <div>
          <p className="w-[532px] pt-2 text-center text-stone-950 text-sm font-normal leading-relaxed">
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

export default AboutUs;
