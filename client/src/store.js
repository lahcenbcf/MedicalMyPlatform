import {createStore,combineReducers,applyMiddleware} from "redux"
import {composeWithDevTools} from "@redux-devtools/extension"
//import our login and register Reducers
import {thunk} from "redux-thunk"
import {loginUserReducer,registerUserReducer,userDetailsReducer} from "./reducers/auth"
import { patientReducer } from "./reducers/patient"


const initialState={}
const middleware=[thunk]
const reducer=combineReducers({
    auth:loginUserReducer,
    register:registerUserReducer,
    userDetails:userDetailsReducer,
    patient:patientReducer
})
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(
    ...middleware)))


export default store;