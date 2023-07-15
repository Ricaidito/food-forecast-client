import "./FrequentQuestion.css";
import QuestionLogo from "../../../images/QuestionLogo.png";

const FrequentQuestion = () => {
  return (
    <div className="h-[787px] bg-opacity-25 bg-lime-600 pt-[8.81rem] grid justify-items-center">
      <div className="">
        <p className="text-stone-900 text-xl font-bold">Preguntas frecuentes</p>
        <p className=" w-[718px] text-stone-950 text-sm font-normal leading-relaxed pt-[1.38rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          id risus sed augue porta bibendum. Phasellus erat ex, feugiat tempus
          porttitor id, consectetur a erat.
        </p>

        <div className=" grid grid-cols-2 gap-x-[3.25rem] gap-y-[3.12rem] pt-[4.94rem]">
          <div className=" flex justify-center gap-x-[1.19rem]">
            <div>
              <img src={QuestionLogo} alt="QuestionLogo" />
            </div>
            <div>
              <p className=" text-stone-900 text-base font-semibold">
                Lorem ipsum dolor sit amet?
              </p>
              <p className=" w-[495px] text-stone-950 text-sm font-normal leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque id risus sed augue porta bibendum. Phasellus erat
                ex, feugiat tempus porttitor id, consectetur a erat.
              </p>
            </div>
          </div>
          <div className=" flex justify-center gap-x-[1.19rem]">
            <div>
              <img src={QuestionLogo} alt="QuestionLogo" />
            </div>
            <div>
              <p className=" text-stone-900 text-base font-semibold">
                Lorem ipsum dolor sit amet?
              </p>
              <p className=" w-[495px] text-stone-950 text-sm font-normal leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque id risus sed augue porta bibendum. Phasellus erat
                ex, feugiat tempus porttitor id, consectetur a erat.
              </p>
            </div>
          </div>
          <div className=" flex justify-center gap-x-[1.19rem]">
            <div>
              <img src={QuestionLogo} alt="QuestionLogo" />
            </div>
            <div>
              <p className=" text-stone-900 text-base font-semibold">
                Lorem ipsum dolor sit amet?
              </p>
              <p className=" w-[495px] text-stone-950 text-sm font-normal leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque id risus sed augue porta bibendum. Phasellus erat
                ex, feugiat tempus porttitor id, consectetur a erat.
              </p>
            </div>
          </div>
          <div className=" flex justify-center gap-x-[1.19rem]">
            <div>
              <img src={QuestionLogo} alt="QuestionLogo" />
            </div>
            <div>
              <p className=" text-stone-900 text-base font-semibold">
                Lorem ipsum dolor sit amet?
              </p>
              <p className=" w-[495px] text-stone-950 text-sm font-normal leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque id risus sed augue porta bibendum. Phasellus erat
                ex, feugiat tempus porttitor id, consectetur a erat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentQuestion;
