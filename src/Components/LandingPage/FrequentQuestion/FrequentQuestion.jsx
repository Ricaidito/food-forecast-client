import QuestionLogo from "../../../images/QuestionLogo.png";

const FrequentQuestion = () => {
  const faqs = [
    {
      question:
        "¿Cómo se asegura Food Forecast de que los precios son actuales y precisos?",
      answer:
        "Nuestra plataforma actualiza la base de datos de precios semanalmente, utilizando algoritmos para verificar la precisión de la información directamente desde las fuentes.",
    },
    {
      question: "¿Puedo cancelar mi suscripción premium en cualquier momento?",
      answer:
        "La suscripción premium se puede cancelar en cualquier momento sin penalidad alguna.",
    },
    {
      question:
        "¿Puedo recibir notificaciones sobre cambios de precios de productos específicos?",
      answer:
        "Sí, puedes configurar alertas personalizadas para recibir notificaciones cuando el precio de un producto específico cambie.",
    },
    {
      question:
        "¿Qué fuentes de datos utiliza Food Forecast para recopilar información sobre precios?",
      answer:
        "Utilizamos una variedad de fuentes confiables, incluyendo supermercados y páginas como Mi Precio Justo, La Sirena, Jumbo y Supermercados Nacional, para asegurarnos de que nuestros precios reflejen el mercado actual.",
    },
  ];

  return (
    <div className="grid h-[787px] justify-items-center bg-lime-600 bg-opacity-25 pt-[8.81rem]">
      <div>
        <p className="text-2xl font-bold text-stone-900">
          Preguntas frecuentes
        </p>
        <p className=" w-[718px] pt-[1.38rem] text-lg font-normal leading-relaxed text-stone-950">
          Aquí presentamos las preguntas más comunes relacionadas con la
          utilización de nuestros servicios. Si su consulta no se encuentra
          entre ellas o requiere información adicional, por favor, póngase en
          contacto con nosotros a través de nuestros canales de atención
          oficial, donde le asistiremos con la mayor brevedad posible.
        </p>

        <div className=" grid grid-cols-2 gap-x-[3.25rem] gap-y-[3.12rem] pt-[4.94rem]">
          {faqs.map((faq, i) => (
            <div key={i} className=" flex justify-center gap-x-[1.19rem]">
              <div>
                <img src={QuestionLogo} alt="QuestionLogo" />
              </div>
              <div>
                <p className=" text-base font-semibold text-stone-900">
                  {i + 1}. {faq.question}
                </p>
                <p className=" w-[495px] text-sm font-normal leading-relaxed text-stone-950">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrequentQuestion;
