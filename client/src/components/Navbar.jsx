import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/DoctorLogo2.png";
import { useDispatch, useSelector } from 'react-redux';
function Navbar() {
    const {medInfo}=useSelector(state => state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    /*const logoutSession=()=>{
        dispatch(logoutUser())
        navigate("/login")
    }
    useEffect(()=>{
        if(!medInfo._id) navigate("/login")
    },[medInfo])*/

    const logout=()=>{
      navigate("/login")
    }
  return (
    <div className="w-full border flex justify-between items-center px-20 py-8 shadow-lg">
    <Link to={"/dashboard"}>     
    <img src={logo} className="w-[12rem]" alt="" />

    </Link> 
          {
            medInfo?._id ? <ul>
            <Link to={"/calendrier"} className='headerbutton  w-40 text-doctor-blue rounded'>Calendrier</Link>
            <Link to={"/historique"} className='headerbutton w-44 text-doctor-blue rounded mx-10' >Historique</Link>
            <Link to={"/notify"} className='headerbutton text-doctor-blue mx-10' >Notifications</Link>
            <button onClick={logout} className='headerbutton text-doctor-blue mx-10' >Déconnecter</button>
            </ul> : 
          
          <Link to={"/login"} className="py-3 px-7 bg-mainColor rounded-3xl font-semibold text-white">
            S’identifier
          </Link>

          }
    </div>
  )
}

export default Navbar
