import axios from 'axios'
import {setAlert} from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST
} from './types'

// Get Post

export const getPosts = () => async dispatch =>{
    try{
        await axios.get('/api/post/fetch-all-posts').then(res =>{
            if(res.data.success){
                dispatch({
                    type: GET_POSTS,
                    payload: res.data.posts
                })
            }else{
                dispatch({
                    type: POST_ERROR,
                    message: res.data.message
                })
            }
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            message: error.data.message
        })
    }
}

// ADD LIKE
export const addLikes = (id) => async dispatch =>{
    try{
        console.log('here')
        await axios.post(`api/post/post-likes/${id}`).then(res =>{
            if(res.data.success){
                dispatch({
                    type: UPDATE_LIKES,
                    payload: {id, likes: res.data.likes}
                })
            }else{
                dispatch({
                    type: POST_ERROR,
                    message: res.data.message
                })
            }
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            message: error.data.message
        })
    }
}
// Remove like

export const removeLike = (id) => async dispatch =>{
    try{
        await axios.post(`api/post/post-unlike/${id}`).then(res =>{
            if(res.data.success){
                dispatch({
                    type: UPDATE_LIKES,
                    payload: {id, likes: res.data.likes}
                })
            }else{
                dispatch({
                    type: POST_ERROR,
                    message: res.data.message
                })
            }
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            message: error.data.message
        })
    }
}

// DELETE POST
export const deletePost = (id) => async dispatch =>{
    try{
        await axios.post(`api/post/delete-post/${id}`).then(res =>{
            if(res.data.success){
                console.log('yo')
                dispatch({
                    type: DELETE_POST,
                    payload: id
                })
                dispatch(setAlert('POST REMOVED','success'))
            }else{
                dispatch({
                    type: POST_ERROR,
                    message: res.data.message
                })
            }
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            message: error.data.message
        })
    }
}
// ADD POST

export const addPost = (formData) => async dispatch =>{
    try{
        console.log('yo')
        console.log(formData)
        const config ={
            headers: {
              'Content-Type': 'application/json'
            }
          }
          
        await axios.post(`api/post/create-post`,formData,config).then(res =>{
            if(res.data.success){
                console.log('yo')
                dispatch({
                    type: ADD_POST,
                    payload: res.data.post
                })
                dispatch(setAlert('POST CREATED','success'))
            }else{
                dispatch({
                    type: POST_ERROR,
                    message: res.data.message
                })
            }
        })
    }catch(error){
        dispatch({
            type: POST_ERROR,
            message: error.data.message
        })
    }
}