import React,{useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import UserSearch from '../user-search-component/userSearch'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './searchPanel.css'
function SearchPanel() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
        <div className = "container-fluid search-container" style = {{color:"white"}}>
        <h4>Search Panel</h4>
            <div className="row">
                <div className="col search-links">
                    <ul>
                        <Link onClick  = {handleShow}><li>User Search</li></Link>
                        <Link ><li>Post Search</li></Link>
                        <Link ><li>Group Search</li></Link>             
                    </ul>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} backdrop = "static" keyboard = {false} >
               <Modal.Body>
                    <UserSearch/>
                    <Button onClick = {handleClose}>Close</Button>
               </Modal.Body>
            </Modal>
        </div>

    )
}

export default SearchPanel

