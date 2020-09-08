import axios from 'axios'
import {setAlert} from './alert'

import { 
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types'

export const getCurrentProfile = () => async dispatch =>{
    try {
        console.log('here yar')
       await axios.get('/api/profile/fetch-a-userProfile')
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data.profile
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
        await axios.post('/api/profile/create-profile', formData, config)
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
                dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
               
                    history.push('/dashboard')
                
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

//  Add Experience

export const addExperience = (formData, history) => async dispatch => {
    try{
        const config ={
            headers: {
              'Content-Type': 'application/json'
            }
          }
        axios.post('/api/profile/add-profile-experience', formData, config)
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data
                })
                dispatch(setAlert('Experience Added', 'success'))
                
                    history.push('/dashboard')
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

//  Add Education

export const addEducation = (formData, history) => async dispatch => {
    try{
        const config ={
            headers: {
              'Content-Type': 'application/json'
            }
          }
        axios.post('/api/profile/add-profile-education', formData, config)
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data
                })
                dispatch(setAlert('Education Added', 'success'))
                
                    history.push('/dashboard')
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