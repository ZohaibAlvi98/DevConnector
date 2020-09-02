import React from 'react'
import {Link} from 'react-router-dom'

const DashboardAction = () => {
    return (
        <div class="dash-buttons">
        <Link to="/edit-profile" class="btn btn-light"><i class="fas fa-user-circle text-primary" style={{display: 'inline-block', 'margin-right': '.5em'}}></i>
        Edit Profile</Link>
        <Link to="/add-experience" class="btn btn-light"
          ><i class="fab fa-black-tie text-primary" style={{display: 'inline-block', 'margin-right': '.5em'}}></i> 
          Add Experience</Link>
        <Link to="/add-education" class="btn btn-light"
          ><i class="fas fa-graduation-cap text-primary" style={{display: 'inline-block', 'margin-right': '.5em'}}></i> 
          Add Education</Link>
      </div>

    )
}

export default DashboardAction