import axios from 'axios'
import {setAlert} from './alert'
import { createHashHistory } from "history";

import { 
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
     ACCOUNT_DELETED,
     CLEAR_PROFILE,
     GET_PROFILES,
     GET_REPOS,
     USER_LOADED
} from './types'

export const getCurrentProfile = () => async dispatch =>{
    try {
        console.log('here yar')
       await axios.get('/api/profile/get-user-profile')
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data.UserProfile
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
            payload: {msg: error.message}
        })
    }
}

// fetch all profile


export const fetchAllProfile = ( history) => async dispatch=>{
    dispatch({ type: CLEAR_PROFILE})
    try{
       
        await axios.get('/api/profile/fetch-all-profile')
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_PROFILES,
                    payload: res.data.profile
                })
            
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data.message
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

// fetch user by profileId

export const fetchUserById = (userId , history) => async dispatch=>{
 
    try{
       
        await axios.get('/api/profile/fetch-user/'+userId)
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: USER_LOADED,
                    payload: res.data.user
                })
            
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data.message
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



// fetch profile by ID


export const fetchProfileById = (userId , history) => async dispatch=>{
 
    try{
       
        await axios.get('/api/profile/fetch-a-userProfile/'+userId)
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data.message
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

// get repos


export const getGitRepos = (username) => async dispatch=>{
    try{
       
        await axios.get('/api/profile/get-github-repos?key='+username)
        .then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_REPOS,
                    payload: res.data.repos
                })
            
            }else{
                console.log('here')
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data.message
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
                    payload: res.data.profile
                })
                dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
               
                    history.push('/dashboard')
                
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data.message
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
                    payload: res.data.profile
                })
                dispatch(setAlert('Experience Added', 'success'))
                
                    history.push('/dashboard')
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data.message
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
                    payload: res.data.profile
                })
                console.log(res.data)
                dispatch(setAlert('Education Added', 'success'))
                
                    history.push('/dashboard')
            }else{
                dispatch({
                    type: PROFILE_ERROR,
                    message: res.data.message
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

export const deleteExperience = id => async dispatch => {
    try{
        const config ={
            headers: {
              'Content-Type': 'application/json'
            }
          }
        await axios.post('/api/profile/delete-profile-experience/'+id, config)
        .then(res =>{
            if(res.data.success){ 
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data.profile
                })
                dispatch(setAlert('Experience Removed', 'success'))
            }
        })
    } catch (err){
        dispatch({
            type: PROFILE_ERROR,
            message: err.message
        })
    }
}


export const deleteEducation = id => async dispatch => {
    try{
        
        const config ={
            headers: {
              'Content-Type': 'application/json'
            }
          }
      
        await axios.post('/api/profile/delete-profile-education/'+id, config)
        .then(res =>{
            if(res.data.success){ 
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data.profile
                })
                dispatch(setAlert('Education Removed', 'success'))
            }
        })
    } catch (err){
        dispatch({
            type: PROFILE_ERROR,
            message: err.message
        })
    }
}


export const deleteAccount = (history) => async dispatch => {
    if(window.confirm('Are You Sure You Want To Delete? This Cannot Be Undone')){
        try{
           
            const config ={
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            await axios.post('/api/profile/delete-profile' ,config)
            .then(res =>{
                if(res.data.success){ 
                    dispatch({type: CLEAR_PROFILE})
                    dispatch({type: ACCOUNT_DELETED})
                       
                    dispatch(setAlert('Profile Removed', 'success'))
                    history.push("/register")
                }
            })
        } catch (err){
            dispatch({
                type: PROFILE_ERROR,
                message: err.message
            })
        }
    }
   
}