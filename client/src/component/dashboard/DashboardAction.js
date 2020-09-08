import React from 'react'
import {Link} from 'react-router-dom'

const DashboardAction = () => {
    return (
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary" style={{display: 'inline-block', 'margin-right': '.3em'}}></i>
        Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary" style={{display: 'inline-block', 'margin-right': '.3em'}}></i> 
          Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary" style={{display: 'inline-block', 'margin-right': '.3em'}}></i> 
          Add Education</Link>
      </div>

    )
}

export default DashboardAction
