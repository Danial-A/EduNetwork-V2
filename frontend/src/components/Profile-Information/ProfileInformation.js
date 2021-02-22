import React from 'react'
import '../../pages/UserProfile.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faThumbsUp, faUsers, faTasks} from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom'
import Cookies from 'js-cookie'

function ProfileInformation() {
    
    return (
        <div className="user-info">
            <div className="user-heading"> 
                <h3>Profile Information</h3>
            </div>
            <div className="information-section">
                <ul>
                    <li><Link><FontAwesomeIcon icon = {faEdit} className = "icon"/>Posts</Link></li>
                    <li><Link><FontAwesomeIcon icon = {faThumbsUp} className = "icon"/>Likes</Link></li>
                    <li><Link to = '/group'><FontAwesomeIcon icon = {faUsers} className = "icon"/>Groups</Link></li>
                </ul>
             <div className="groups-section">
                <ul className="group-names">
                    <li><Link>Group 1 with a long name for testing purpose to check what kind of space it takes</Link></li>
                    <li><Link>Group 2</Link></li>
                    <li><Link>Group 3</Link></li>
                    <li><Link>Group 4</Link></li>
                </ul>
             </div>
            </div>
        </div>
    )
}

export default ProfileInformation
