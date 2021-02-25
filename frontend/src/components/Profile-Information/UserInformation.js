import { faUser, faEnvelope, faCalendar, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Modal, Button} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import './UserInformation.css'
import 'bootstrap/dist/css/bootstrap.min.css'




function UserInformation() {
    const user = Cookies.get('user')
    const [User,setUser] = useState({})

    //Show hide modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <li><FontAwesomeIcon icon = {faCalendar} className = "icon"/>DOB:<pre> {User.dob}</pre></li>
                   
                </ul>
            </div>


            
            <Modal show={show} onHide={handleClose} className = "modal-user-update">
                <Modal.Header closeButton>
                <Modal.Title >UPDATE USER INFORMATION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name: </label>
                            <input type="text" className = "form-control" id = "firstname" placeholder = "Enter the firstname.." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name: </label>
                            <input type="text" className = "form-control" id = "lastname" placeholder = "Enter the lastname.." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username"> Username: </label>
                            <input type="text" className = "form-control" id = "username" placeholder = "Enter the username.." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email ID: </label>
                            <input type="email" className = "form-control" id = "email" placeholder = "Enter the email.." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Last Name: </label>
                            <input type="date" className = "form-control" id = "dob" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            <div className="edit-btn">
                <button onClick = {handleShow}>Edit Profile Information</button>
            </div>
        </div>
    )
}

export default UserInformation
