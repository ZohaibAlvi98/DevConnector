import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education:{
    school,
    degree,
    fieldOfStudy,
    to,from,
    description
}}) => {
    // const moment = moment(from).format('YYYY-MM-DD')
    return (
        <div>
            <h3 className='text-dark'> {school} </h3>
            <p>
              <Moment format='YYYY/MM/DD'>{from}</Moment>  uptill {!to ? 'Now' : {to} }
            </p>
            <p>
             <strong>Degree: </strong>{degree}
            </p>
            <p>
             <strong>fieldOfStudy: </strong>{fieldOfStudy}
            </p>
            <p>
            <strong>Description: </strong>{description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,
}

export default ProfileEducation
