import {PATIENTS_ERR,GET_PATIENTS,PATIENT_LOADING} from "../constants/patientActions"
import {baseUrl} from "./medecin"


export const getPatients=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:PATIENT_LOADING
    })
    const res=await baseUrl.get(`/patient/${getState().auth.medInfo._id}`);
    if(res.data?.message){
        dispatch({
            type:PATIENTS_ERR,
            payload:res.data.message
        })
    }else{
        console.log(res.data)
        dispatch({
            type:GET_PATIENTS,
            payload:res.data
        })
    }
    } catch (error) {
        dispatch({
            type:PATIENTS_ERR,
            payload:error.message
        })
    }
}


export const addPatient=(data)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:PATIENT_LOADING
        });

        const res=await baseUrl.post(`/patient/addPatient`,{
            medId:getState().auth.medInfo._id,
            patientData:data
        });

        if(res.data?.message){
            dispatch({
                type:PATIENTS_ERR
            })
        }else{
            dispatch({
                type:ADD_PATIENT
            })
        }
    } catch (error) {
        dispatch({
            type:PATIENTS_ERR,
            payload:error.message
        })
    }
}