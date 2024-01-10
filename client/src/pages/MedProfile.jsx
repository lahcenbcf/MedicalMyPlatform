import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Propic from '../assets/pacPic.png';
import { baseUrl, updateUserProfile } from '../actions/medecin';
import {uploadPhoto} from "../actions/medecin"
import Spinner from '../components/Spinner';
function MedProfile() {
    const [uploading,setUploading]=useState(false)
  const { medInfo ,loading,success} = useSelector((state) => state.auth);
  const [formData,setFormData]=useState({
    nm:"",
    genre:"",
    lastname:"",
    firstname:"",
    username:"",
    password:"",
    dateDebutTravail:"",
    lieuDeTravail:""
  })
  const [isUpdate,setIsUpdate]=useState(false)
const [imagePath,setImagePath]=useState("")

const changeHandler=()=>  {
    document.querySelector(".fileInput").click()
}

const dispatch=useDispatch()

const handleRequest=()=>{
    dispatch(updateUserProfile({...formData , imagePath : imagePath ? imagePath :null}))
}
  const uploadHandler=async(e)=>{
    const file=e.target.files[0]
    const newFormData=new FormData()
    newFormData.append("image",file)

    setUploading(true)
    const res=await baseUrl.post("/upload",newFormData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    console.log(res.data)
    setImagePath(res.data)
    dispatch(
      uploadPhoto(imagePath)
    )
    setUploading(false)

    try {
    } catch (error) {
        
    }
  }
  return (
    <div className="container mx-auto w-full flex flex-col items-center px-6">
    {
        uploading && <Spinner />
    }
    {
        loading && <Spinner />
    }
      <div className="m-auto w-32 h-32 mt-6 mb-28 relative">
        <img src={Propic} alt="" className="w-full object-cover" />
        <button onClick={changeHandler} className="bg-mainColor px-12 right-[50%] translate-x-[50%] mt-4 rounded-lg absolute top-32 text-white font-bold">
          Changer la photo
        </button>
        <input type="file" className='fileInput hidden' onChange={uploadHandler} name='file' />
      </div>
      <div className="grid grid-cols-4 gap-14 w-full rounded-2xl my-5 h-full">
        <div className="p-7 flex flex-col gap-10 bg-[#6E7F9B]">
          <span>Nom</span>
          <span>Prénom</span>
          <span>Genre</span>
          <span>Nom d'utitlsateur</span>
          <span>Mot de passe</span>
        </div>
        <div className="flex flex-col items-center gap-10 p-7">
        {
            isUpdate ? <input type='text' placeholder='last name' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                lastname:e.target.value
            })} value={formData.lastname}  /> : <span>{medInfo.lastname}</span>
        }
          

        {
            isUpdate ? <input type='text' placeholder='first name' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                firstname:e.target.value
            })} value={formData.firstname}  /> : <span>{medInfo.firstname}</span>
        }

        {
            isUpdate ? <input type='text' placeholder='genre' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                sexe:e.target.value
            })} value={formData.sexe}  /> : <span>{medInfo.sexe}</span>
        }
        {
            isUpdate ? <input type='text' placeholder='username' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                username:e.target.value
            })} value={formData.username}  /> : <span>{medInfo.username}</span>
        }
        {
          isUpdate ? <input type='password' placeholder='password' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
              ...formData,
              username:e.target.value
          })} value={formData.username}  /> : <span>{medInfo.username}</span>
      }
        </div>
        <div className="flex flex-col items-center gap-10 p-7 bg-[#6E7F9B]">
          <span>Email</span>
          <span>Téléphone</span>

          <span>Spécialité</span>
          <span>Date début de travail</span>
          <span>Lieu de travail</span>
        </div>
        <div className="flex flex-col items-center gap-10 p-7">
          <span>{medInfo.email}</span>
          {
            isUpdate ? <input type='text' placeholder='05552283099' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                nm:e.target.value
            })} value={formData.nm}  /> : <span>{medInfo.nm}</span>
        }
        {
            isUpdate ? <input type='text' placeholder='domain' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                domain:e.target.value
            })} value={formData.domain}  /> : <span>{medInfo.domain}</span>
        }
        {
            isUpdate ? <input type='text' placeholder='yyyy-MM-dd' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                dateDebutTravail:e.target.value
            })} value={formData.dateDebutTravail}  /> : <span>{medInfo.dateDebutTravail}</span>
        }
        {
            isUpdate ? <input type='text' placeholder='lieu de traval' className='border-2 border-mainColor mx-3 rounded-md py-3 px-3 ml-10 placeholder:opacity-50' onChange={e => setFormData({
                ...formData,
                lieuDeTravail:e.target.value
            })} value={formData.lieuDeTravail}  /> : <span>{medInfo.lieuDeTravail}</span>
        }
        </div>
        <div className="five w-full flex justify-between items-center p-7"></div>
      </div>
      {
        isUpdate ? <button onClick={handleRequest} className="bg-mainColor px-10 py-3 mx-auto mb-6 text-center">
        Enregistrer les information
      </button> : <button className="bg-mainColor px-10 py-3 mx-auto text-white mb-6 text-center" onClick={()=>setIsUpdate(!isUpdate)}>Modifier les informations</button>
      }
      
    </div>
  );
}

export default MedProfile;
