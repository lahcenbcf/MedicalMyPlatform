import React, { useEffect } from 'react'
import {Outlet, useNavigate} from "react-router-dom"
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
function AppLayout() {
  const {medInfo}=useSelector(state => state.auth)
  const navigate=useNavigate()
  useEffect(()=>{
      if(!medInfo?._id) navigate("/login")
  },[medInfo._id])
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AppLayout
