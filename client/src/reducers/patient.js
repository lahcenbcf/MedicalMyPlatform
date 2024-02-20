import {PATIENTS_ERR,GET_PATIENTS,PATIENT_LOADING,ADD_PATIENTS,FILTER_PATIENT} from "../constants/patientActions"


const initialState={
    patients:[],
    filteredPatients:[],
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

        case FILTER_PATIENT:
            
            return {
                ...state,
                loading:false,
                filteredPatients:action.payload
            }
    
        default:
            return state
    }
}


