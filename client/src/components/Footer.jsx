import X from "../assets/Group.svg";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/insta.svg";
import Linkedin from "../assets/linkedin.svg";
function Footer() {
  return (
    <footer className="p-6 bg-mainColor w-full absolute bottom-0 text-white flex justify-around item-center">
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
  </footer>
   
  )
}

export default Footer
