import React,{Fragment, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/spinner'
import {fetchProfileById} from '../../actions/profile'
import {fetchUserById} from '../../actions/profile'
import ProfileExperince from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'


const Profile = ({fetchProfileById, auth , profile:{profile,loading}, match,history}) => {
   
    useEffect(()=>{
      
        fetchProfileById(match.params.id)
    }, [fetchProfileById, match.params.id])
    
    return <Fragment>
            {profile == null || loading ? <Spinner /> : (<Fragment>
                <Link to='/profiles' className="btn btn-light" >Back To Profiles</Link>
              
                {auth.isAuthenticated && auth.loading == false && auth.user._id == profile.profile.user &&
                <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>}
                <div className='profile-grid my-1'>
                <div class="profile-top bg-primary p-2">
         <h1> </h1>
          <img
            class="round-img my-1"
            src={profile.userDetail.avatar}
            alt=""
          />
          <h1 class="large">{profile.userDetail.name}</h1>
        <p class="lead">{profile.profile.status} {profile.profile.company && <span> at {profile.profile.company}</span>}</p>
        <p>{profile.profile.location && <span>{profile.profile.location}</span> }</p>
      
          <div class="icons my-1">
            {profile.profile.website && (
              <a href={profile.profile.website} target="_blank" rel="noopener noreferrer">
              <i class="fas fa-globe fa-2x"></i>
            </a>
            )}
            {profile.profile.social && profile.profile.social.twitter && (
              <a href={profile.profile.social.twitter} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            )}
              {profile.profile.social && profile.profile.social.facebook && (
              <a href={profile.profile.social.facebook} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x"></i>
              </a>
            )}
              {profile.profile.social && profile.profile.social.instagram && (
              <a href={profile.profile.social.instagram} target="_blank" rel="noopener noreferrer">
               <i class="fab fa-instagram fa-2x"></i>
            </a>
            )}
              {profile.profile.social && profile.profile.social.youtube && (
              <a href={profile.profile.social.youtube} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x"></i>
            </a>
            )}
             {profile.profile.social && profile.profile.social.linkedin && (
              <a href={profile.profile.social.linkedin} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
            )}
          </div>
        </div>
          
             <div class="profile-about bg-light p-2">
                 {profile.profile.bio && (
                    <Fragment>
                        <h2 class="text-primary">{profile.userDetail.name.trim().split(' ')}s Bio</h2>
                        <p>
                        {profile.profile.bio}
                        </p>
                    </Fragment>
                   
                 )}
         
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
              {profile.profile.skills.map((skill,index)=>(
                   <div key={index} class="p-1"><i class="fa fa-check"></i> {skill} </div>
              ))}
          </div>
        </div>

                
                <div className='profile-exp bg-white p-2'>
                <h2 class="text-primary">Experience</h2>
                {profile.profile.experience.length >0 ? (<Fragment>
                  {profile.profile.experience.map(exp =>(
                    <ProfileExperince key={exp._id} experience={exp} />
                    
                  ))}
                </Fragment>) : (<h4>No Experience..</h4>)}
                </div>

                <div className='profile-edu bg-white p-2'>
                <h2 class="text-primary">Education</h2>
                {profile.profile.education.length >0 ? (<Fragment>
                  {profile.profile.education.map(edu =>(
                    <ProfileEducation key={edu._id} education={edu} />
                   

                  ))}
                   </Fragment>) : (<h4>No Education..</h4>)}
                </div>
                {profile.profile.githubusername && (
                  <ProfileGithub username={profile.profile.githubusername} />
                )}
                </div>
            </Fragment>)}
    </Fragment>
}

Profile.propTypes = {
    fetchProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
 
}

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth,
    // userDetail: state.profile.userDetail
})

export default connect(mapStateToProps,{fetchProfileById})(Profile)
