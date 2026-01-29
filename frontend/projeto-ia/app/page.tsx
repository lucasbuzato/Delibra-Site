export default function Home() {
  return (
    <html className="scroll-smooth" lang="pt-BR">
      <body>
        {/* HEADER */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 sm:p-6 md:p-8 text-white z-50">
          <div className="flex items-center">
            <img
              src="./geometric-abstract-logo-symbol-for-a-decision-supp (1).svg"
              alt="Logo"
              className="h-10 sm:h-14 md:h-18 mr-3"
            />
            <span className="text-xl sm:text-3xl md:text-4xl font-semibold">
              Delibra
            </span>
          </div>

          <nav className="hidden sm:block">
            <ul className="flex space-x-4 sm:space-x-6 md:space-x-8 text-lg sm:text-2xl md:text-3xl font-semibold mr-4 md:mr-10">
              <li><a href="#problema" className="hover:text-gray-300">Problema</a></li>
              <li><a href="#sobre" className="hover:text-gray-300">Sobre</a></li>
              <li><a href="#contato" className="hover:text-gray-300">Contato</a></li>
            </ul>
          </nav>
        </header>

        {/* HERO */}
        <section className="min-h-screen bg-bg bg-hero bg-cover bg-center text-white flex flex-col items-center justify-center px-4 text-center">
          <div className="flex flex-col items-center justify-center max-w-265">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold p-2">
              Converse, Aprenda, Evolua.
            </h1>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-light p-2">
              Uma IA criada para apoiar decisões conscientes guiando reflexões
              a partir das suas próprias ideias e valores.
            </h3>
          </div>

          <a
            href="/chat"
            className="bg-button-red p-3 rounded-lg m-2 text-lg sm:text-xl md:text-2xl font-bold shadow-md transition-all duration-500 hover:bg-red-700 active:scale-95"
          >
            Experimente de graça
          </a>
        </section>

        {/* PROBLEMA */}
        <section
          id="problema"
          className="min-h-screen bg-sections text-white flex flex-col justify-center px-6 sm:px-12 md:px-27.5 py-12.75"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="flex justify-center">
              <img src="/Group 10.png" className="w-72 sm:w-96 md:w-150" alt="" />
            </div>

            <div className="flex flex-col justify-center items-start md:items-end gap-6 md:gap-10">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
                Problema
              </h1>
              <p className="text-lg sm:text-2xl md:text-4xl font-light w-full md:w-155 text-justify">
                Pessoas em ascensão no mercado de trabalho costumam enfrentar
                decisões importantes em pouco tempo: aceitar uma vaga, mudar de
                área, seguir um caminho esperado ou arriscar outro. Muitas dessas
                decisões são tomadas sob pressão ou expectativa externa. O
                problema não é errar — é decidir antes de entender.
              </p>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section
          id="sobre"
          className="min-h-screen bg-sections text-white flex flex-col text-start px-6 sm:px-12 md:px-27.5 py-12.75 gap-8 md:gap-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
            Sobre
          </h1>

          <p className="text-lg sm:text-2xl md:text-4xl font-light text-justify">
            <span className="font-bold">Delibra</span> é um chat inteligente
            focado em <span className="font-bold">reflexão</span> e{" "}
            <span className="font-bold">tomada de decisões pessoais</span> e
            profissionais.
          </p>

          <p className="text-lg sm:text-2xl md:text-4xl font-light text-justify">
            O objetivo não é oferecer respostas prontas, mas ajudar a organizar
            pensamentos e apoiar decisões conscientes.
          </p>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-20">
            {[
              { img: "/muted-emoji-svgrepo-com 1.png", text: "Conversas não invasivas" },
              { img: "/first-aid-icon 1.png", text: "Foco em clareza emocional" },
              { img: "/Vector.png", text: "Decisões guiadas, não impostas" },
            ].map((item, i) => (
              <div
                key={i}
                className="w-72 h-72 sm:w-96 sm:h-96 md:w-106 md:h-106 text-center flex flex-col justify-center items-center bg-button-red rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img src={item.img} className="w-16 sm:w-20 md:w-25" alt="" />
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
                  {item.text}
                </h2>
              </div>
            ))}
          </div>
        </section>

        {/* CONTATO */}
        <section
          id="contato"
          className="min-h-screen bg-sections text-white flex flex-col items-center justify-center px-6 sm:px-12 md:px-27.5 py-12.75 gap-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
            Contato
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center items-start gap-6 md:gap-10">
              <h3 className="text-lg sm:text-2xl md:text-4xl font-light">
                <span className="font-bold">Behance:</span>{" "}
                https://www.behance.net/everlughia
              </h3>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-light">
                <span className="font-bold">LinkedIN:</span>{" "}
                https://www.linkedin.com/in/lucas-buzato-venarusso
              </h3>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-light">
                <span className="font-bold">Email:</span>{" "}
                lbuzatovenarusso@gmail.com
              </h3>
            </div>

            <div className="flex justify-center">
              <img
                src="/sv2.jpg"
                className="w-64 h-64 sm:w-96 sm:h-96 md:w-150 md:h-150 rounded-full shadow-2xl"
                alt=""
              />
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
