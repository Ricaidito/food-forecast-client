import "./App.css";

const App = () => {
  return (
    <div>
      <div className="">
        <div className="w-96 h-28 relative">
          <div className="w-96 h-28 left-0 top-0 absolute border border-green-500" />
          <div className="left-[749px] top-[58px] absolute text-center text-neutral-800 text-base font-light">
            Inicio
          </div>
          <div className="left-[827px] top-[57px] absolute text-center text-neutral-800 text-base font-light">
            Sobre Nosotros
          </div>
          <div className="left-[984px] top-[57px] absolute text-center text-neutral-800 text-base font-light">
            Subscripcion
          </div>
          <div className="left-[1123px] top-[58px] absolute text-center text-neutral-800 text-base font-light">
            Contacto
          </div>
          <div className="w-40 h-12 left-[259px] top-[40px] absolute">
            <div className="w-24 h-8 left-[60.77px] top-[8.20px] absolute"></div>
            <div className="w-4 h-5 left-[14.80px] top-[14.89px] absolute"></div>
            <div className="w-1 h-1.5 left-[27.72px] top-[9.25px] absolute"></div>
          </div>
          <div className="w-40 h-11 left-[1393px] top-[44px] absolute">
            <div className="w-40 h-11 left-0 top-0 absolute rounded border border-green-700" />
            <div className="left-[25px] top-[11px] absolute text-center text-green-700 text-base font-normal">
              Iniciar sesión
            </div>
          </div>
          <div className="w-40 h-11 left-[1566px] top-[44px] absolute">
            <div className="w-40 h-11 left-0 top-0 absolute bg-lime-600 rounded" />
            <div className="left-[40px] top-[11px] absolute text-center text-green-50 text-base font-normal">
              Registrar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
