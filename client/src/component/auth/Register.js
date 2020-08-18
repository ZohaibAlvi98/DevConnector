import React, { Fragment, useState } from 'react'
import axios from 'axios'

export const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      console.log('Passwords do not match')
    }else{
      console.log(formData)
      const newUser = {
        name,
        email,
        password
      }
      try{
        const config ={
          headers: {
            'Content-Type': ''
          }
        }
        // console.log(newUser)
        // const body = JSON.stringify(newUser)
        // console.log(body)
        axios.post('/api/user/create-user', formData, config)
        .then(res =>{
          if(res.success){
            console.log(res)
          }else{
            console.log(res.message)
          }
        })
      }catch(err){
        console.log(err.response.data)
      }
    }
  }
    return (
       <Fragment>
           <div className="continer" style={{  width: "300px" , height: "200px", margin: "110px auto"}}>
          <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2} 
            onChange={e => onChange(e)}
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p> 
      </div>
       </Fragment>
    )
}
export default Register