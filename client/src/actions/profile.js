import axios from 'axios'
import {setAlert} from './alert'

import { 
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

export const getCurrentProfile = () => async dispatch =>{
    try {
        console.log('here yar')
        axios.get('/api/profile/fetch-a-userProfile')
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {success: res.data}
                })
            }
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.resonse.statusText}
        })
    }
}

export const createProfile = (formData , history, edit = false) => async dispatch=>{
    try{
        const config ={
            headers: {
              'Content-Type': 'application/json'
            }
          }
        axios.post('/api/profile/create-profile', formData, config)
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
                dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
                if(!edit){
                    history.push('/dashboard')
                }
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data
                })
              
            }
        })
    } catch(error) {
        dispatch({
            type: PROFILE_ERROR,
            message: error.message
        })
    }
}