import React from 'react';
import pacPic from '../assets/pacPic.png';
import { useLocation } from 'react-router-dom';



function PatientScreen() {
    const {state}=useLocation()
  return (
    <div className="container mx-auto w-full px-4 flex flex-col items-center gap-6">
      {/* profile pic */}

      <div className="m-auto w-32 h-32 mt-8 relative">
        <img src={pacPic} className='w-full object-cover' alt="" />
      </div>

      <div className="">
        <div className="persInfo my-3  text-center w-full">
          Données Personnelles
        </div>
        <div className="table">
          <div className="one one w-full flex justify-between items-center p-7">
            <span>Nom</span>
            <span>{state.lastname}</span>
          </div>
          <div className="two  w-full flex justify-between items-center p-7">
            <span>Prénom</span>
            <span>{state.firstname}</span>
          </div>
          <div className="three  w-full flex justify-between items-center p-7">
            <span>Genre</span>
            <span>{state.sexe ? state.sexe :"Homme"}</span>
          </div>
          <div className="four  w-full flex justify-between items-center p-7">
            <span>Date de naissance</span>
            <span>{state.dateBirth ? state.dateBirth :"2002-06-12"}</span>
          </div>
          <div className="five  w-full flex justify-between items-center p-7">
            <span>groupe sanguin</span>
            <span>{state.gs ? state.gs : "A+"}</span>
          </div>
          <div className="six  w-full flex justify-between items-center p-7">
            <span>Poids</span>
            <span>{state.poids ? state.poids : "30"}kg</span>
          </div>
          <div className="seven  w-full flex justify-between items-center p-7">
            <span>Taille</span>
            <span>1{state.taille ? state.taille :"187"}</span>
          </div>
          <div className="eight  w-full flex justify-between items-center p-7">
            <span>Téléphone</span>
            <span>{state.nm ? state.nm : "076789745"}</span>
          </div>
        </div>
        <a
          className="text-right suivant  underline block cursor-pointer  mt-4 text-xl "
          href="#"
        >
          Suivant
        </a>
      </div>
      {/* <a className="suivant">Suivant</a> */}
    </div>
  );
}

export default PatientScreen;
