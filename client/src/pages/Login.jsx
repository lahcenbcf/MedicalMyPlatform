import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/DoctorLogo2.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import {validate} from "react-email-validator"
import { useDispatch, useSelector } from "react-redux";
import {loginMed} from "../actions/medecin"
import Spinner from "../components/Spinner";
export default function Login() {
    const [visible,setVisible]=useState(false)
    const [isValidate,setIsValidate]=useState(true)
    const [formData,setFomData]=useState({
        password:"",
        email:""
    })
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {loading,success,error}=useSelector(store => store.auth)

    const submitData=(e)=>{
        e.preventDefault()
        if(!validate(formData.email) && !formData.password.trim().length > 6) {
            setIsValidate(false)
            return
        }
  
        setIsValidate(true)
        dispatch(loginMed(formData.email,formData.password))
    }

    useEffect(()=>{
      if(success)  window.location.href="/dashboard"
    },[success])

  return (
    <div className="flex min-h-screen items-center justify-center">
    {/*  */}
    {loading && <Spinner />}
      <div className=" py-10 max-w-xl w-full border-solid rounded-xl border-2 bg-white shadow-lg flex flex-col items-center px-8">
        <img className="py-2 w-[12rem] m-auto text-2xl" src={logo} alt="" />
        <p className="login-description italic text-2xl py-1.5 text-center ">Ravie de Vous revoir</p>
        <input
            value={formData.email}
            onChange={(e)=>setFomData({
                ...formData,
                email:e.target.value
            })}
            onFocus={()=>setIsValidate(true)}
          className="my-5 w-full mx-auto py-3 pl-4 border-solid rounded-xl border-2 placeholder:text-black opacity-80"
          placeholder=" Nom d'utlisateur ou address Email"
          type="text"
              />
              <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
        <input value={formData.password} onChange={(e)=>setFomData({
            ...formData,
            password:e.target.value
        })} onFocus={()=>setIsValidate(true)} className="placeholder:text-black opacity-80" placeholder="Mot de passe" type={visible ? "text" : "password"} />
                  
                   {visible ? <MdOutlineRemoveRedEye onClick={()=>setVisible(!visible)} /> : <FaRegEyeSlash onClick={()=>setVisible(!visible)} />} 
              </div>
              {
                !isValidate && <span className="text-red-500">{"Saisez un nom utilisateur et un mot de passe valide"}</span>
              }
              <Link to={"/forgotPass"} className="block cursor-pointer text-slate-400 underline py-2 self-start">Mot de passe oublié ?</Link>
              <button className=" cursor-pointer w-7/12 p-2 font-semibold  mt-2 text-lg continue border-solid rounded-xl border-2.5 text-white" onClick={submitData}>Continuer</button>
              <div className="p-3">Vous n'avez pas de compte? <Link to={"/register"} className="cursor-pointer inscription text-gray-600">inscription</Link></div>
      </div>
    </div>
  );
}