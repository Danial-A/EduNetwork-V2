import { faUser, faEnvelope, faCalendar, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect, useRef} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import './UserInformation.css'

function UserInformation() {
    const user = Cookies.get('user')
    const [User,setUser] = useState({})
    useEffect(()=>{
            async function getUserInfo(){
            const UserInformation =  await axios.get(`http://localhost:5000/users/${user}`)
            setUser(UserInformation.data)
        }
        getUserInfo()
        
    }, [])
    return (
        <div className = "user-information-section">
            <div className ="user-information-heading"> 
                <h3>User Information</h3>
            </div>
            <div className="user-information-display">
                <ul>
                    <li><FontAwesomeIcon icon = {faUser} className = "icon"/>Name: <pre> {User.firstname} {User.lastname}</pre></li>
                    <li><FontAwesomeIcon icon = {faUsers} className = "icon"/>Username:<pre> {User.username}</pre></li>
                    <li><FontAwesomeIcon icon = {faEnvelope} className = "icon"/>Email:<pre> {User.emailid}</pre></li>
                    <li><FontAwesomeIcon icon = {faCalendar} className = "icon"/>DOB:<pre> 23-08-1997</pre></li>
                   
                </ul>
            </div>
            <div className="edit-btn">
                <button>Edit Profile Information</button>
            </div>
        </div>
    )
}

export default UserInformation
