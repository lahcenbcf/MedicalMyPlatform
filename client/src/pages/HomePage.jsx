import X from "../assets/Group.svg";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/insta.svg";
import Linkedin from "../assets/linkedin.svg";
import doctorLogo from "../assets/doctorLogo.png"

function HomePage() {

  return (
      <div className="container w-full mx-auto px-5 flex flex-fluid">
        <div className="px-24 mt-0 items-center ">
          <div className="left-side text-left">
            <h2 className="landingTitle leading-normal text-4xl w-full font-semibold ">
              Bienvenue dans le futur de la médecine: une gestion intelligente
              des patients, sans tracas.
            </h2>
            <h1 className="text-9xl font-bold mt-7 mb-14">Doctor</h1>
            <p className=" text-2xl  w-full leading-normal mb-10">
              Cette plateforme dédiée aux médecins, vise à simplifier leur
              travail en les assistant dans la gestion des patients ainsi que
              dans l'automatisation de la détection, la classification et la
              segmentation des tumeurs grâce à l'intelligence artificielle.
            </p>
          </div>
          <div className="right-side">
            <img
              className=" text-center landingPicture"
              src={doctorLogo}
              alt=""
            />
          </div>
        </div>
        <div className="footer p-6 text-white flex justify-around item-center">
          <p className="text-2xl font-semibold">Suivez-nous sur :</p>
          <div className="social flex gap-3">
            <a href="#">
              <img className="block w-10" src={X} alt="" />
            </a>
            <a href="#">
              <img className="block w-10" src={Facebook} alt="" />
            </a>
            <a href="#">
              <img className="block w-10" src={Instagram} alt="" />
            </a>
            <a href="#">
              <img className="block w-10" src={Linkedin} alt="" />
            </a>
          </div>
          <span className="text-3xl font-bold">Doctor</span>
        </div>
      </div>

  )
}

export default HomePage
