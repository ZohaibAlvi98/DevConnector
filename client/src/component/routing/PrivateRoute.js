import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, auth:{isAuthenticated, loading, token},
     ...rest
    }) => (
         <Route {...rest} 
         render={props => token == null && loading ?
             (<Redirect to='/login' />): (<Component {...props} />)}/>
     )

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
