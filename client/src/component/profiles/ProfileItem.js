import React, {Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import spinner from '../layout/spinner'
import {fetchAllProfile} from '../../actions/profile'
import { Link } from 'react-router-dom'

const ProfileItem = ({profile:{
    profile:{
  
    status,
    skills,
    company,
    location
    },
    userDetail,
}}) => {
    return (
        <div className="profile bg-light">
            <img src={userDetail.avatar} alt="" className="round-img" />
            <div>
                <h2>{userDetail.name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">{ location && <span>{location}</span>}</p>
                <Link to={`/profile/${userDetail._id}`}  className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0,4).map((skill, index)=>(
                    <li key={index} className="text-primary">
                        <i className="fas fa-check-square"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
