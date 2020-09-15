import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'


const Education = ({education}) => {
    const educations = education.map(edu =>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {
                    edu.to == null || edu.to == '' ? (' Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment> )
                }
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
       
    ));
    return (
        <Fragment>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                    <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    educations: PropTypes.array.isRequired,
}

export default Education
