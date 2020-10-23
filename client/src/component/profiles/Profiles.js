import React, {Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import {fetchAllProfile} from '../../actions/profile'
import ProfileItem from './ProfileItem'


const Profiles = ({fetchAllProfile, profile:{profiles,loading}}) => {
    useEffect(()=>{
        fetchAllProfile()
    }, [])
    
    return <Fragment>
                {loading ? <Spinner /> : 
                <Fragment>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 && loading == false  ? (
                            profiles.map(FoundProfile =>(
                                <ProfileItem key={FoundProfile} profile={FoundProfile} />
                        ))
                        ) : (profiles == undefined || profiles == null )&& loading == false ? (<h4>No profile found..</h4>) : (<Fragment><h4>Loading please wait !..</h4></Fragment>)}
                    </div>
                </Fragment>}
            </Fragment>
    
}

Profiles.propTypes = {
    fetchAllProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {fetchAllProfile})(Profiles)
