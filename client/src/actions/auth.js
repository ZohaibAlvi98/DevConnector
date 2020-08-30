import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE,
} from './types'
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'

//load user

export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        console.log(localStorage.token)
        setAuthToken(localStorage.token)
        console.log("here load me")
    }

    try {
        console.log("here try me")
        axios.get('/api/usersession/verify')
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
               

            }else{
                dispatch({
                    type: AUTH_ERROR
            })
          }
        })
    }catch (error) {
        
    }
}

// register user

export const register = ({name, email, password}) => async dispatch => {
    const config ={
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify({name, email, password})
      try{

            axios.post('/api/user/create-user', body, config)
            .then(res =>{
            
                if(res.data.success){
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: res.data
                    })
                   
                   dispatch(loadUser())
                }else{
                    dispatch({
                        type: REGISTER_FAIL
                })
                console.log(res)
                dispatch( setAlert(res.data.message, 'danger'))
            }
        })
    }catch(err){
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


// Login user

export const login = ( email, password) => async dispatch => {
    console.log('here')
    const config ={
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify({ email, password})
      try{
        console.log(body)
            axios.post('/api/user/login', body, config)
            .then(res =>{
            
                if(res.data.success){
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data
                    })
                   
                    dispatch(loadUser())
                }else{
                    console.log(res.data.message)
                    dispatch( setAlert(res.data.message,'danger'),{
                        type: LOGIN_FAIL,
                       
                })
             
               
            }
        })
    }catch(err){
        dispatch(setAlert('Something went wrong','danger'),{
            type: LOGIN_FAIL
        })
     
    }
}

export const logout = () => async dispatch =>{
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: CLEAR_PROFILE
    })
    
}