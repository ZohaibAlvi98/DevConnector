import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience:{
    company,
    title,
    location,
    current,
    to,from,
    description
}}) => {
    // const moment = moment(from).format('YYYY-MM-DD')
    return (
        <div>
            <h3 className='text-dark'> {company} </h3>
            <p>
               {from} uptill {!to ? 'Now' : {to} }
            </p>
            <p>
             <strong>Postion: </strong>{title}
            </p>
            <p>
            <strong>Description: </strong>{description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default ProfileExperience
