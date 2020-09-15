import React, { Fragment, useEffect } from 'react';
import Navbar from './component/layout/Navbar'
import Landing from './component/layout/Landing'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/alert'
import Dashboard from './component/dashboard/Dashboard'
import CreateProfile from './component/profile-forms/CreateProfile'
import EditProfile from './component/profile-forms/EditProfile'
import AddExperience from './component/profile-forms/AddExperience'
import AddEducation from './component/profile-forms/AddEducation'

import PrivateRoute from './component/routing/PrivateRoute'



import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
//redux

import { Provider} from 'react-redux'
import store from './store'
import { addExperience } from './actions/profile';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])

  return(
  <Provider store={store}>
   <Router>
    <Fragment>
    
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className="container">
      <Alert   />
      <Switch>
       
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />

          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />

      </Switch>
      </section>
    </Fragment>
    
    </Router>
    </Provider>
  )};

export default App
