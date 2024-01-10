import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOGOUT,
  UPDATE_MED,
  FORGET_PASS,
} from '../constants/medecin';
import { UNAUTHORIZED } from '../constants/unAuthorizedActions';
import {
  USERDETAILS_FAIL,
  USERDETAILS_REQUEST,
  USERDETAILS_SUCCESS,
  CLEAR_USER_DETAILS,
} from '../constants/medDetails';
import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});
//login action
export const loginMed = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });
    const user = await baseUrl.post(
      '/auth/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          //here after moments we will send our authorization token in
          //protected route
        },
      }
    );
    if (user.data?.message) {
      dispatch({
        type: USER_FAIL,
        payload: user.data.message,
      });
    } else {
      dispatch({
        type: USER_SUCCESS,
        payload: user.data,
      });

      console.log(user.data);

      //save our userData to localStorage
      localStorage.setItem('med', JSON.stringify(getState().auth.medInfo));
    }
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.message,
    });
  }
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });
    const res = await baseUrl.post('/auth/forgetPassword', {
      email,
    });
    if (res.data?.message) {
      dispatch({
        type: USER_FAIL,
        payload: res.data.message,
      });
    } else {
      dispatch({
        type: FORGET_PASS,
      });
    }
  } catch (error) {
    dispatch({
      payload: error.message,
      type: USER_FAIL,
    });
  }
};

//confirm
export const confirmCode = (code) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });
    const res = await baseUrl.post('/auth/confirmMail', {
      code,
      email: getState().auth.medInfo.email,
    });
    console.log(res.data)
    if (res.data?.message) {
      dispatch({
        type: USER_FAIL,
        payload: res.data.message,
      });
    } else {
      dispatch({
        type: USER_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.message,
    });
  }
};

export const changePassword = (newPass) => async (dispatch,getState) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });

    const res = await baseUrl.patch('/auth/changePass', {
      _id: getState().auth.medInfo._id,
      passord: newPass,
    });
    if (res.data?.message) {
      dispatch({
        type: USER_FAIL,
        payload: res.data.message,
      });
    } else {
      dispatch({
        type: USER_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.message,
    });
  }
};

//logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });
    const res = await baseUrl.get('/auth/logout');
    if (res?.message) {
      dispatch({
        type: USER_FAIL,
        payload: res.message,
      });
    } else {
      dispatch({
        type: CLOSE_LOGIN_SESSION,
      });
      dispatch({
        type: CLEAR_USER_DETAILS,
      });
    }
    //remove from local storage
    localStorage.removeItem('med');
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      error: error.message,
    });
  }
};

//register user
export const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });
    const response = await baseUrl.post('/auth/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data?.message) {
      dispatch({
        type: USER_FAIL,
        payload: response.data.message,
      });
    } else {
      dispatch({
        type: USER_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.message,
    });
  }
};

//get userProfile

export const getMedProfile = (medId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERDETAILS_REQUEST,
    });
    const res = await placeholderApi.get(`/auth/getMed/${medId}`, {
      //here we will pass our authorization token Bearer
      /*headers:{
                Authorization:`Bearer ${userInfo.token}`
            }*/
    });
    if (res.data?.message) {
      dispatch({
        type: UNAUTHORIZED,
        payload: res.data?.message,
      });
    } else {
      dispatch({
        type: USERDETAILS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: UNAUTHORIZED,
      payload: error.message,
    });
  }
};

//update userData
export const updateUserProfile = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REQUEST,
    });
    const res = await baseUrl.patch(
      '/auth/update',
      {
        ...data,
        _id: getState().auth.medInfo._id,
      },
      {
        /*headers:{
                    Authorization:`Bearer ${getState().login.userInfo.token}`
                   }
                */
      }
    );
    if (res.data?.message) {
      dispatch({
        type: USERDETAILS_FAIL,
        payload: res.data.message,
      });
    } else {
      dispatch({
        type: USERDETAILS_SUCCESS,
        payload: res.data,
      });

      //set Local storage
      localStorage.setItem('med', JSON.stringify(res.data));
    }
  } catch (error) {
    dispatch({
      type: USERDETAILS_FAIL,
      payload: error.message,
    });
  }
};



export const uploadPhoto=(path)=>async(dispatch,getState)=>{
      try {
        const res=await baseUrl.post("/auth/uploadPhoto",{
          imagePath:path,
          medId:getState().auth.medInfo._id
        })
        console.log(res.data);
        dispatch({
          type:UPDATE_MED,
          payload:res.data
        })
        console.log(res)
      } catch (error) {

      }
} 