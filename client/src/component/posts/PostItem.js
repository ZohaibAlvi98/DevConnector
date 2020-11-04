import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'

const PostItem = ({auth, post:{_id, text, name, avatar,user,likes,comments, date}}) => {
    return (
        <div>
            
        </div>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps,{})(PostItem)
