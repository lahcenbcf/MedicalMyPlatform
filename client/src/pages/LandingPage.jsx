import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPatients } from '../actions/patients';
import Spinner from '../components/Spinner';
import { Link } from "react-router-dom"
import FilterModalPatient from '../components/FilterModalPatient';
import AddPatient from '../components/AddPatient';

function DashBoard() {
    const dispatch=useDispatch()
    const {loading,patients,success}=useSelector(store => store.patient)

    const [modalIsShown,setModalIsShown]=useState(false)
    const [addPatientModal,setAddPatientModal]=useState(false)
    const showModal=()=>{
      setModalIsShown(prev => !prev)
   }

    useEffect(()=>{
        dispatch(getPatients())
    },[])

  return (
    <div className='container mx-auto w-full'>
    {
        loading && <Spinner />
    }
    {
      modalIsShown && <FilterModalPatient setShowModal={setModalIsShown} />
      
    }
    {addPatientModal && <AddPatient />}

    <div className='text-4xl flex  ml-11 mt-5 justify-between '>
      <h1>List des patients</h1>
      <button onClick={showModal} className='btn mr-24 border-2 text-doctor-blue px-10 border-doctor-blue rounded-3xl text-xl'>Filtrer</button>
    </div>
    <div className='bg-mainColor w-full text-white mt-9 pb-5 flex justify-evenly items-center rounded-2xl'>
       <h1 className=' mt-4 mx-24 text-2xl'>Nom</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Prénom</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Etat</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Détails</h1>
    </div>
  
    <div className='w-full flex justify-evenly '>
       <h1 className=' mt-4 mx-24 text-2xl'>DJAOUDI</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Khalida</h1>
       <h1 className=' mt-4 mx-24 text-2xl text-red-600' >Malade</h1>
       <button className='listbtn mt-4 mx-24 text-2xl underline text-doctor-blue'>Voir plus</button>
    </div>

    {

        patients.length ? patients.map(p=>(
            <div className='w-full flex justify-evenly '>
       <h1 className=' mt-4 mx-24 text-2xl'>{p.lastname}</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>{p.firstname}</h1>
       <h1 className=' mt-4 mx-24 text-2xl text-red-600' >Malade</h1>
       <Link to={`/patient/${p._id}`} state={p} className='listbtn mt-4 mx-24 text-2xl underline text-doctor-blue'>Voir plus</Link>
    </div>
        )) : null

    }
    {/*

<div className='list2 ml-24  flex justify-between '>
       <h1 className=' mt-4 mx-24 text-2xl'>BAITECH</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Sami</h1>
       <h1 className=' mt-4 mx-24 text-2xl text-green-600' >Non malade</h1>
       <button className='listbtn mt-4 mx-24 text-2xl underline text-doctor-blue'>Voir plus</button>
    </div>
    <div className='list2 ml-24  flex justify-between '>
       <h1 className=' mt-4 mx-24 text-2xl'>BENNEFISSA</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Mahmoud</h1>
       <h1 className=' mt-4 mx-24 text-2xl text-red-600' >Malade</h1>
       <button className='listbtn mt-4 mx-24 text-2xl underline text-doctor-blue'>Voir plus</button>
    </div>
    <div className='list2 ml-24  flex justify-between '>
       <h1 className=' mt-4 mx-24 text-2xl'>MEZIANE</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Redouane</h1>
       <h1 className=' mt-4 mx-24 text-2xl text-green-600' >Non malade</h1>
       <button className='listbtn mt-4 mx-24 text-2xl underline text-doctor-blue'>Voir plus</button>
    </div>
    <div className='list2 ml-24  flex justify-between '>
       <h1 className=' mt-4 mx-24 text-2xl'>Djaoudi</h1>
       <h1 className=' mt-4 mx-24 text-2xl'>Khalida</h1>
       <h1 className=' mt-4 mx-24 text-2xl text-red-600' >Malade</h1>
       <button className='listbtn mt-4 mx-24 text-2xl underline text-doctor-blue'>Voir plus</button>
    </div>
    <div className='list3 ml-26  flex justify-evenly  shadow-inner'>
       <button className=' mt-4 mx-11 text-xl text-doctor-blue'>Précédent</button>
       <button className=' mt-4 mx-11 text-xl text-white bg-doctor-blue rounded-lg px-5 py-1' >Ajouter un patient</button>
       <button className='mt-4 mx-11 text-xl  text-doctor-blue'>Suivant</button>
    </div>
*/}
    
   <div className='fixed bottom-6 right-6 flex justify-evenly items-center w-full mx-auto'>
         <Link className='underline'>Précédent</Link>
         <button onClick={()=>setAddPatientModal(true)} setAddPatientModal={setAddPatientModal} className='px-6 py-2 rounded-md bg-mainColor text-white font-semibold'>Ajouter un patient</button>
         <Link className='underline'>Suivant</Link>
   </div>
    </div>
  )
}

export default DashBoard