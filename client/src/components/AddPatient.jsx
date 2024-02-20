import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { validate } from 'react-email-validator';
import { addPatient } from '../actions/patients';
import logo from "../assets/DoctorLogo2.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

const AddPatient = ({ setAddPatientModal }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    sexe: '',
    email: '',
    dateBirth: '',
    sg: '',
    poids: '',
    taille: '',
    address: '',
    nm: '',
  });
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((store) => store.patient);

  const [isValidate, setValidate] = useState(true);

  const submitForm = (e) => {
    e.preventDefault();
    var phonenReg = /^(00213|\+213|0)(5|6|7)[0-9]{8}$/;
    const newReg = new RegExp(phonenReg);
    //var dateRegex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
    if (
      !formData.firstname.trim().length ||
      !validate(formData.email) ||
      !newReg.test(formData.nm) ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.address ||
      !formData.taille ||
      !formData.dateBirth ||
      !formData.poids ||
      !formData.sexe
    ) {
      setValidate(false);
      return;
    }
    setValidate(true);
    dispatch(addPatient(formData));
  };

 
  const [visible, setVisible] = useState(false);
  return (
    <div className='fixed inset-0 h-full w-full glassBg flex justify-center items-center'>
      <div className=" w-4/6 p-6  h-fit border-solid rounded-xl border-2 bg-white shadow-lg flex flex-col items-center px-8">
        <img className="py-2 w-[12rem]  m-auto .text-2xl" src={logo} alt="" />
        <p className="login-description italic text-2xl py-1.5 text-center ">
          Ajouter un patient
        </p>

        <div className="h-fit w-full flex justify-between items-center">
          <div className="first-col ml-5 w-1/2 mx-6">
            <div className="mt-3 mb-2  b-color  py-3 px-4 pr-8  w-full rounded-xl ">
              <input
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastname: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Nom"
                type="text"
              />
            </div>
            <div className="mt-3 mb-2 b-color  py-3 px-4 pr-8  w-full rounded-xl">
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstname: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                value={formData.firstname}
                className="placeholder:text-black opacity-80"
                placeholder="Prénom"
                type="text"
              />
            </div>
            <div className="mt-3 mb-2 b-color  py-3 px-4 pr-8  w-full rounded-xl ">
              <input
                value={formData.sexe}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sexe: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Genre"
                type="text"
              />
            </div>
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Address"
                type={visible ? 'text' : 'password'}
              />
              
            </div>
          </div>
          <div className="bar rounded h-40"></div>
          <div className="second-col mr-5 w-1/2 mx-6">
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nm: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Téléphone"
                type={visible ? 'text' : 'password'}
              />
              
            </div>
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
                value={formData.email}
                onFocus={() => setValidate(true)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dateBirth: e.target.value,
                  })
                }
                className="placeholder:text-black opacity-80"
                placeholder="Date de naissance"
                type="date"
              />
              
            </div>
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sg: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Groupe sanguine"
                type="text"
              />
              
            </div>
            <div className="mt-3 mb-2 m-auto b-color flex justify-between py-3 px-4 w-full rounded-xl ">
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sg: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Poids"
                type="text"
              />
              <input
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sg: e.target.value,
                  })
                }
                onFocus={() => setValidate(true)}
                className="placeholder:text-black opacity-80"
                placeholder="Taille"
                type="text"
              />
              
            </div>
            
          </div>
        </div>
        {!isValidate && (
          <span className="text-red-500 my-4 text-center">
            {'check your inputs !!'}
          </span>
        )}
        <button
          onClick={submitForm}
          className="block m-auto cursor-pointer w-7/12 p-4 font-semibold  mt-6 text-lg continue border-solid rounded-xl border-2.5 text-white"
        >
          Ajouter
        </button>
        <button
          onClick={() => setAddPatientModal(false)}
          className="text-center rotour underline block cursor-pointer forget-password py-2 "
        >
          Retour
        </button>
      </div>
      </div>
  );
};

export default AddPatient;
