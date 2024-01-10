import {PATIENTS_ERR,GET_PATIENTS,PATIENT_LOADING,ADD_PATIENTS} from "../constants/patientActions"


const initialState={
    patients:[],
    success:true,
    err:""
}


export const patientReducer=(state=initialState,action)=>{
    switch (action.type) {
        case GET_PATIENTS:
            return {
                ...state,loading:false,patients:action.payload
            }
        case PATIENTS_ERR:
            return {
                ...state,
                loading:false,
                success:false
            }
        case PATIENT_LOADING:{
            return {
                ...state,loading:true
            }
        }
        case ADD_PATIENTS:
            return {
                ...state,loading:false,
                success:true
            }
    
        default:
            return state
    }
}


