import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types'
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
                   

                }else{
                    dispatch({
                        type: REGISTER_FAIL
                })
            }
        })
    }catch(err){
        dispatch({
            type: REGISTER_FAIL
        })
    }
}