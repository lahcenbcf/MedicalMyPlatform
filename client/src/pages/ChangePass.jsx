
import logo from "../assets/DoctorLogo2.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { changePassword } from "../actions/medecin";
import { useDispatch,useSelector } from "react-redux";
import {} from "../actions/medecin"
import Spinner from "../components/Spinner";
// import { GoEyeClosed } from "react-icons/go";
// import { GoEye } from "react-icons/go";
export default function ConfirmPassword() {
    const [visible,setVisible]=useState(false)
    const dispatch=useDispatch()
    const {loading,success}=useSelector(store => store.auth)
    const [newPass,setNewPass]=useState("")
    const [isValidate,setIsValidate]=useState(true)
    const [confirmPass,setConfirmPass]=useState("")
    const navigate=useNavigate()

    const changePass=(e)=>{
      e.preventDefault();
      if(newPass != confirmPass) {
        setIsValidate(false);
        return;
      }
      setIsValidate(true)
      dispatch(changePassword(newPass));
    }

    useEffect(()=>{
        if(success) navigate("/")
    },[success])
  return (
    <div className="flex items-center justify-center h-screen">
    {loading && <Spinner />}
      <div className=" py-16 h-fit max-w-xl w-full border-solid rounded-xl border-2 bg-white shadow-lg flex flex-col items-center">
        <img className="py-2 w-[12rem] m-auto text-xl my-4" src={logo} alt="" />
              <p className="login-description italic text-2xl py-1.5 text-center mb-5">Modifiez votre mot de passe</p>
              
        {/* <input
          className="w-9/12  py-3  mt-8 mb-7 pl-4 border-solid rounded-xl border-2 placeholder:text-black opacity-80"
          placeholder="address Email"
          type="text"
              /> */}
              <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-9/12 rounded-xl ">
        <input value={newPass} className="placeholder:text-black opacity-80 w-full" placeholder="Nouveau mot de passe" type={visible ? "text":"password"} onChange={(e)=>setNewPass(e.target.value)} />
        {visible ? <MdOutlineRemoveRedEye onClick={()=>setVisible(!visible)} /> : <FaRegEyeSlash onClick={()=>setVisible(!visible)} />} 
              </div>
              <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-9/12 rounded-xl ">
        <input value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} className="placeholder:text-black opacity-80 w-full" placeholder="Confirmez le mot de passe" type="text" />
        {visible ? <MdOutlineRemoveRedEye onClick={()=>setVisible(!visible)} /> : <FaRegEyeSlash onClick={()=>setVisible(!visible)} />} 
              </div>
              <button className="my-6 cursor-pointer w-7/12 p-2 font-semibold   text-lg continue border-solid rounded-xl border-2.5 text-white" onClick={changePass}>Continuer</button>
              <Link to={"/forgotPass"} className="rotour underline block cursor-pointer forget-password py-2 ">Retour</Link>
      </div>
    </div>
  );
 }