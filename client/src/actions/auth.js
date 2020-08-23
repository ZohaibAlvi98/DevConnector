import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'


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