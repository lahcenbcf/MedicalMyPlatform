import {USER_REQUEST,USER_SUCCESS,USER_FAIL,CLOSE_LOGIN_SESSION,FORGET_PASS} from "../constants/medecin"
import { USERDETAILS_FAIL, USERDETAILS_REQUEST, USERDETAILS_SUCCESS,CLEAR_USER_DETAILS } from "../constants/medDetails"
//login reducer
const initialState1={
    loading:false,
    medInfo:localStorage.getItem("med") ? JSON.parse(localStorage.getItem("med")) : {},
    error:"",
    success:false
}
export const loginUserReducer=(state=initialState1,action)=>{
    switch (action.type) {
        case USER_REQUEST:
            return {...state,loading:true,success:false}
        case USER_SUCCESS:
            return {medInfo:action.payload,loading:false,success:true}
        case USER_FAIL:
            return {...state,loading:false,error:action.payload,success:false}
        case FORGET_PASS:
            return {...state,success:true,loading:false}
        case CLOSE_LOGIN_SESSION:
            return {...state,medInfo:{}}
        default: return state
    }
}

//register reducer
const initialState2={
    loading:false,
   success:false,
   error:""
}
export const registerUserReducer=(state=initialState2,action)=>{
    switch (action.type) {
        case USER_REQUEST:
            return {...state,loading:true}
        case USER_SUCCESS:
            return {success:action.payload,loading:false}
        case USER_FAIL:
            return {...state,loading:false,error:action.payload}
        default: return state
    }
}




//userDetailsReducer
const initialState4={
    loading:false,
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
}

export const userDetailsReducer=(state=initialState4,action)=>{
    switch (action.type) {
        case USERDETAILS_REQUEST:
            return {...state,loading:true}
        case USERDETAILS_SUCCESS: 
            return {loading:false,user:action.payload}
        case CLEAR_USER_DETAILS:
            return {loading:false,user:{}}
        case USERDETAILS_FAIL:
            return {...state,error:action.payload,loading:false}
        case CLEAR_USER_DETAILS:
            return {
                ...state,user:{}
            }
        default:
            return state
    }
}



