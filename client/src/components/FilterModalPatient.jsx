import { useDispatch } from "react-redux"
import CheckBoxInput from "./CheckBoxInput"
import InputField from "./InputField"
import { filterPatients } from "../actions/patients"
import { useState } from "react"

const FilterModalPatient = ({
    setShowModal
}) => {
    const dispatch=useDispatch()
    const [isChecked,setIsCheked]=useState(false)
    const handleFilter=(e)=>{
        e.preventDefault()
        const formData=new FormData(e.target)
        dispatch(filterPatients(formData))
    }
  return (
    <div className="fixed inset-0 h-full w-full flex justify-center items-center glassBg">
            <div className="max-w-md w-full p-10 bg-white rounded-md shadow-md">

            <form onSubmit={handleFilter}>
                
                    <InputField type={"text"} name="nomP" placeHolder={"Nom du patient"} />
                    <InputField type={"text"} name="prenomP" placeHolder={"Prénom du patient"} />
                <div className="flex justify-between">
                    <CheckBoxInput isChecked={isChecked} setCheck={setIsCheked} name={"malade"} label={"Malade"} />
                    <CheckBoxInput isChecked={isChecked} setCheck={setIsCheked} name={"non-malade"} label={"Non malade"} />
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="px-6 py-3 rounded-md shadow-md text-white font-semibold bg-mainColor">Filter</button>
                    <button onClick={()=>setShowModal(false)} className="px-6 py-3 rounded-md shadow-md text-white font-semibold bg-mainColor">Annuler</button>
                </div>
            </form>

            
            </div>
    </div>
  )
}

export default FilterModalPatient
