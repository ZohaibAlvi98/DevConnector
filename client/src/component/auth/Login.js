import {Link} from 'react-router-dom'
import React, { Fragment, useState } from 'react'

export const Login = () => {
   
  const [formData, setFormData] = useState({
    email: '',
    password: ''

  })

  const {email, password} = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    console.log('success')
    //   try{
    //     const config ={
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }
        
    //     const body = JSON.stringify(newUser)
        
    //     axios.post('/api/user/create-user', body, config)
    //     .then(res =>{
      
    //       if(res.data.success){
    //         console.log(res.data)
    //       }else{
    //         console.log(res.data.message)
    //       }
    //     })
    //   }catch(err){
    //     console.log(err.response.data)
    //   }
    }
  
    return (
       <Fragment>
           <div className="continer" style={{  width: "300px" , height: "200px", margin: "170px auto"}}>
          <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" />
        
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
             onChange={e => onChange(e)}
            name="password"
            minLength="6"
          />
        </div>
       
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/register">Sign Up</Link>
      </p> 
      </div>
       </Fragment>
    )
}

export default Login