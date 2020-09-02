import React , {useEffect,Fragment } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import DashboardAction from '../dashboard/DashboardAction'
import Spinner from '../layout/spinner'


const Dashboard =  ({getCurrentProfile, auth:{ user, token}, profile: {profile, loading}})  => {
    useEffect(()=>{
         getCurrentProfile()
        
    },[] )

    const haveProfile = (
        <Fragment>
            <DashboardAction />
        </Fragment>
    )
    const noProfile = (
        
        <Fragment>
            <p>you have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary btn-sm my-1'>
                Create Profile
            </Link>
        </Fragment>
    )

    return loading && profile === null && user == null ? (<Spinner /> ): 
    <Fragment> 
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'></i> Welcome { user != null && user.name } 
        </p>
    
        { profile !== null  ? (
         haveProfile
    ): loading == false  ? noProfile : (<Fragment></Fragment>) 
    }
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
