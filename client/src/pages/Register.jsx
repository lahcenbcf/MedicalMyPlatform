import { useEffect, useState } from "react";
import logo from "../assets/DoctorLogo2.png";

// import { GoEyeClosed } from "react-icons/go";
// import { GoEye } from "react-icons/go";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import {validate } from "react-email-validator";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import {registerUser} from "../actions/medecin"



export default function Register() {
    const [formData,setFormData]=useState({
        password:"",
        email:"",
        firstname:"",
        lastname:"",
        username:"",
        nm:""
    })
    const dispatch=useDispatch()
    const {loading,error,success}=useSelector(store=>store.register)

    const [isValidate,setValidate]=useState(true)

    const submitForm=(e)=>{
        e.preventDefault()
        var phonenReg=  /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
        const newReg= new RegExp(phonenReg)
        //var dateRegex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
        if(!formData.password.trim().length > 6 || !validate(formData.email) ||!newReg.test(formData.nm)  || !formData.firstname || !formData.lastname || !formData.username) {
            setValidate(false)
            return;
        }
        setValidate(true)
        dispatch(registerUser(formData))
    }


    useEffect(()=>{
      if(success) window.location.href="/login"
    })

    const [visible,setVisible]=useState(false)
  return (
    <div className="container mx-auto w-full overflow-hidden flex justify-center items-center min-h-screen ">
    {
      loading && <Spinner />
    }
      <div className=" w-4/6 p-6  h-fit border-solid rounded-xl border-2 bg-white shadow-lg flex flex-col items-center px-8">
        <img className="py-2 w-[12rem]  m-auto .text-2xl" src={logo} alt="" />
        <p className="login-description italic text-2xl py-1.5 text-center ">
          Créez votre compte
        </p>

        <div className="h-fit w-full flex justify-between items-center">
          <div className="first-col ml-5 w-1/2 mx-6">
            <div className="mt-3 mb-2  b-color  py-3 px-4 pr-8  w-full rounded-xl ">
              <input
                value={formData.lastname}
                onChange={(e)=>setFormData({
                    ...formData,
                    lastname:e.target.value
                })}
                onFocus={()=>setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Nom"
                type="text"
              />
            </div>
            <div className="mt-3 mb-2 b-color  py-3 px-4 pr-8  w-full rounded-xl">
              <input
                onChange={(e)=>setFormData({
                    ...formData,
                    firstname:e.target.value
                })}
                onFocus={()=>setValidate(true)}
                value={formData.firstname}
                className="placeholder:text-black opacity-80"
                placeholder="Prénom"
                type="text"
              />
            </div>
            <div className="mt-3 mb-2 b-color  py-3 px-4 pr-8  w-full rounded-xl ">
              <input
                value={formData.username}
                onChange={(e)=>setFormData({
                    ...formData,
                    username:e.target.value
                })}
                onFocus={()=>setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Nom d'utilisateur"
                type="text"
              />
            </div>
          </div>
          <div className="bar rounded h-40"></div>
          <div className="second-col mr-5 w-1/2 mx-6">
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
                value={formData.password}
                onChange={(e)=>setFormData({
                    ...formData,
                    password:e.target.value
                })}
                onFocus={()=>setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Mot de passe"
                type={visible ? "text" : "password"}
              />
              {visible ? <MdOutlineRemoveRedEye onClick={()=>setVisible(!visible)} /> : <FaRegEyeSlash onClick={()=>setVisible(!visible)} />}
            </div>
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
              value={formData.email}
              onFocus={()=>setValidate(true)}
              onChange={(e)=>setFormData({
                ...formData,
                email:e.target.value
              })}
                className="placeholder:text-black opacity-80"
                placeholder="Adresse e-mail"
                type="email"
              />
              {visible ? <MdOutlineRemoveRedEye onClick={()=>setVisible(!visible)} /> : <FaRegEyeSlash onClick={()=>setVisible(!visible)} />}
            </div>
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
                onChange={(e)=>setFormData({
                    ...formData,
                    nm:e.target.value
                })}
                onFocus={()=>setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Numéro téléphone"
                type="text"
              />
              {visible ? <MdOutlineRemoveRedEye onClick={()=>setVisible(!visible)} /> : <FaRegEyeSlash onClick={()=>setVisible(!visible)} />}
            </div>
          </div>
        </div>
{
    !isValidate && <span className="text-red-500 my-4 text-center">{"check your inputs !!"}</span>
}
        <button onClick={submitForm} className="block m-auto cursor-pointer w-7/12 p-4 font-semibold  mt-6 text-lg continue border-solid rounded-xl border-2.5 text-white">
          Continuer
        </button>
        <Link
          className="text-center rotour underline block cursor-pointer forget-password py-2 "
          to="/login"
        >
          Retour
        </Link>
      </div>
    </div>
  );
}