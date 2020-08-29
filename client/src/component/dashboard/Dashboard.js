import React , {useEffect,Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/spinner'

const Dashboard = ({getCurrentProfile, auth:{ user, token}, profile: {profile, loading}}) => {
    useEffect(()=>{
        getCurrentProfile()
    }, [])
    return loading && profile === null && token == null ? <Spinner /> : 
    <Fragment> 
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Welcome { user != null && user.name } 
        </p>
    </Fragment>
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
   
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)
