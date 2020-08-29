import axios from 'axios'
import setAlert from './alert'

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
            }
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.resonse.statusText}
        })
    }
}