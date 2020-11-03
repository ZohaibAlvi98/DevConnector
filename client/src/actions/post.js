import axios from 'axios'
import {setAlert} from './alert'
import {
    GET_POSTS,
    POST_ERROR
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