import { useEffect, useState } from "react";
import logo from "../assets/DoctorLogo2.png";
import { Link, useNavigate } from "react-router-dom";
// import { GoEyeClosed } from "react-icons/go";
// import { GoEye } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { confirmCode } from "../actions/medecin";
import Spinner from "../components/Spinner";
export default function ForgotPass() {
    const navigate=useNavigate()
    const [code,setCode]=useState("")
    const [isFalse,setIsFalse]=useState(false)
    
    const dispatch=useDispatch()
    const {loading,success,error}=useSelector(store => store.auth)
    const submit=(e)=>{
        e.preventDefault()
        if(!code){
            setIsFalse(true);
            return;
        }
        setIsFalse(false)
        dispatch(confirmCode(code));

    }
    useEffect(()=>{
        if(success){
            window.location.href="/changePass"
        }
    },[success])
  return (
    <div className="flex items-center justify-center h-screen">
    {loading && <Spinner />}
      <div className="py-16 h-fit max-w-xl w-full border-solid rounded-xl border-2 bg-white shadow-lg flex flex-col items-center">
        <img className="py-2 w-[12rem] m-auto text-xl" src={logo} alt="" />
        <p className="login-description italic text-2xl py-1.5 text-center ">Mot de passe oublié ?</p>
        <p className="text-base text-center px-14">
        Saisissez le code de confirmation que nous vous  avons envoyé par mail
        </p>
        <input
        value={code}
        onChange={e => setCode(e.target.value)}
        onFocus={()=>setIsFalse(false)}
          className="w-9/12  py-3  mt-8 mb-7 pl-4 border-solid rounded-xl border-2 placeholder:text-black opacity-80"
          placeholder="address Email"
          type="text"
              />
              {isFalse && <span className="text-red-500">{"saisir une adresse email valide !!"}</span>}
              <button className=" cursor-pointer w-7/12 p-2 font-semibold  mt-2 text-lg continue border-solid rounded-xl border-2.5 text-white" onClick={submit}>Continuer</button>
              <Link to={"/login"} className="rotour underline block cursor-pointer forget-password py-2">Retour</Link>
      </div>
    </div>
  );
}