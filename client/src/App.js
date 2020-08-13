import React, { Fragment } from 'react';
import Navbar from './component/layout/Navbar'
import Landing from './component/layout/Landing'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

const App = () =>
   <Router>
    <Fragment>
    
      <Navbar />
      <Route exact path='/' component={Landing} />
      <Switch className='container'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
      </Switch>
    </Fragment>
    
    </Router>
 

export default App
