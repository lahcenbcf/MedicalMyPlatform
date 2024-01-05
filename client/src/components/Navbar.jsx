import React from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/DoctorLogo2.png";
function Navbar() {
  return (
    <div className="w-full border flex justify-between items-center px-20 py-8 shadow-lg">
          <img src={logo} className="w-[12rem]" alt="" />
          <Link to={"/login"} className="py-3 px-7 bg-mainColor rounded-3xl font-semibold text-white">
            S’identifier
          </Link>
    </div>
  )
}

export default Navbar
