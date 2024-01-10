import doctorLogo from "../assets/doctorLogo.png"
import Footer from "../components/Footer"

function HomePage() {

  return (
      <div className="container min-h-screen pt-16 w-full mx-auto px-5 flex justify-between flex-wrap gap-[3rem] overflow-hidden overflow-x-hidden relative">
          <div className="flex-fluid max-w-2xl mt-10">
            <h2 className="text-4xl w-full font-semibold text-mainColor">
              Bienvenue dans le futur de la médecine: une gestion intelligente
              des patients, sans tracas.
            </h2>
            <h1 className="text-9xl font-bold mt-7 mb-14">Doctor</h1>
            <p className=" text-2xl w-full leading-normal mb-10">
              Cette plateforme dédiée aux médecins, vise à simplifier leur
              travail en les assistant dans la gestion des patients ainsi que
              dans l'automatisation de la détection, la classification et la
              segmentation des tumeurs grâce à l'intelligence artificielle.
            </p>

          
        </div>

        <div className="flex-fluid w-[32rem] -mt-10">
        <img
          className="w-full object-cover"
          src={doctorLogo}
          alt=""
        />
      </div>
       <Footer />
      </div>

  )
}

export default HomePage
