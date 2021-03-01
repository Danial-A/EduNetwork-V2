import { faUser, faEnvelope, faCalendar, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Modal, Button} from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
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


    //Edit user information

    const initialValues = {
        firstname:User.firstname,
        lastname:User.lastname,
        username:User.username,
        emailid:User.emailid,
        dob:User.dob
    }
    const onSubmit = (values)=>{
        axios.post(`http://localhost:5000/users/${user}/update`, values)
        .then(response=> console.log(response))
        .catch(err=> console.log(err))
        console.log(values)
    }
    const validationSchema = Yup.object({
       firstname:Yup.string().required("First name is required..."),
       lastname:Yup.string().required("Last name is required..."),
       username:Yup.string().required("Username is required..."),
       emailid : Yup.string().required('Email id is required...'),
       dob: Yup.date().required("DOB is required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    //console.log(user)
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
                    <li><FontAwesomeIcon icon = {faCalendar} className = "icon"/>DOB:<pre> {moment(User.dob).format("MMMM DD YYYY")}</pre></li>
                   
                </ul>
            </div>


            
            <Modal show={show} onHide={handleClose} className = "modal-user-update">
                <Modal.Header closeButton>
                <Modal.Title >UPDATE USER INFORMATION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit = {formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name: </label>
                            <input 
                            type="text" name = "firstname"
                            className = "form-control" id = "firstname" 
                            placeholder = "Enter the firstname.."
                            value = {formik.values.firstname}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                             />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name: </label>
                            <input type="text" name = "lastname"
                            className = "form-control" id = "lastname" 
                            placeholder = "Enter the lastname.." 
                            value = {formik.values.lastname}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username"> Username: </label>
                            <input type="text" name = "username"
                            className = "form-control" id = "username"
                            placeholder = "Enter the username.." 
                            value = {formik.values.username}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email ID: </label>
                            <input type="email" name = "emailid"
                            className = "form-control" id = "email" 
                            placeholder = "Enter the email.." 
                            value = {formik.values.emailid}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth: </label>
                            <input type="date" name = "dob"
                            className = "form-control" 
                            id = "dob" 
                            value = {formik.values.dob}
                            onChange = {formik.handleChange}
                            onBlur = {formik.handleBlur}
                            />
                        </div>
                        <Button type = "submit" variant = "danger">
                            save changes
                        </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
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
