import { useState } from "react";
import {Link} from "react-router-dom"
import logo from "../assets/DoctorLogo2.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";


export default function Login() {
    const [visible,setVisible]=useState(false)
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className=" py-10 max-w-xl w-full border-solid rounded-xl border-2 bg-white shadow-lg flex flex-col items-center px-8">
        <img className="py-2 w-[12rem] m-auto text-2xl" src={logo} alt="" />
        <p className="login-description italic text-2xl py-1.5 text-center ">Ravie de Vous revoir</p>
        <input
          className="my-5 w-full mx-auto py-3 pl-4 border-solid rounded-xl border-2 placeholder:text-black opacity-80"
          placeholder=" Nom d'utlisateur ou address Email"
          type="text"
              />
              <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
        <input className="placeholder:text-black opacity-80" placeholder="Mot de passe" type="text" />
                  
                   {visible ? <MdOutlineRemoveRedEye onClick={()=>setVisible(!visible)} /> : <FaRegEyeSlash onClick={()=>setVisible(!visible)} />} 
              </div>
              <Link to={"/forgotPass"} className="block cursor-pointer text-slate-400 underline py-2 self-start">Mot de passe oublié ?</Link>
              <button className=" cursor-pointer w-7/12 p-2 font-semibold  mt-2 text-lg continue border-solid rounded-xl border-2.5 text-white">Continuer</button>
              <div className="p-3">Vous n'avez pas de compte? <Link to={"/register"} className="cursor-pointer inscription text-gray-600" href="#">inscription</Link></div>
      </div>
    </div>
  );
}