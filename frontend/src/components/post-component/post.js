import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Axios from 'axios'
import Tippy from '@tippy.js/react'
import { faThumbsUp, faComment, faShare, faSave, faTrash,faEdit,faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostComment from '../comments/comment'
import Cookies from 'js-cookie'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './post.css'
import 'tippy.js/dist/tippy.css'


function Post({posts, loading}) {
    const username = Cookies.get('username')
    const [liked, setLiked] = useState(false)

    //Handle close/open Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const checkLike = (postid)=>{
        axios.post(`http://localhost:5000/posts/${postid}/like`,{username})
        .then(response=> {

            if(response.status === 200){
                // setLiked(true)
                if(response.data === 'liked') {
                    setLiked(true)
                   
                }
                else {
                    setLiked(false)
                }
            }
        })
        .catch(err=> console.log(err))
    }


    const DeletePost = (postid)=>{
        Axios.delete(`http://localhost:5000/posts/${postid}`)
        .then(res=>{
            window.alert("Post Deleted");
            
            console.log(res.data)
        })
        .catch(err=>{console.log(err)})
        }

    if(loading){
        return <h2>Loading...</h2>
    }

  
    return (
        <div className="container-fluid posts-section">
            {
                posts.map(post=>(
                    
                    <div key = {post._id} className="post-container container">
                      <div className="row user-info-row">
                        <div className="col-md-6">
                           <span className = "user-heading">User:</span> {post.author}
                        </div>
                        <div className="col-md-6 created-at">
                            <pre><strong>Created:</strong> {moment(post.createdAt).fromNow()}</pre>
                        </div>
                      </div>
                      <div className="row" style = {{justifyContent:"space-between"}}>
                        <div className="col-md-8">
                            <div className="post-heading-section">
                                <h4>{post.title}</h4>
                            </div>
                        </div> 
                        <div className="co-md-4">
                        <div className="delete-icons-row">
                            <Link ><FontAwesomeIcon  icon = {faTrash} onClick = {()=>DeletePost(post._id)}/></Link>
                            <Link><FontAwesomeIcon icon = {faEdit} onClick = {handleShow} /></Link>
                            <Link><FontAwesomeIcon icon = {faArchive}/></Link>
                    </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                            <div className="post-body">
                                <p>{post.body}</p>
                            </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 like-icons-row">
                            <Tippy content = {`${post.likes.length} ${post.likes.length > 1 ? ('Likes'):('Like')}`}><Link><FontAwesomeIcon icon = {faThumbsUp} onClick = {()=> checkLike(post._id)} className = {`${liked ? ('liked'): ('disliked')}`}/></Link></Tippy>
                            <Tippy content = {`${post.comments.length} ${post.comments.length > 1 ? ('Comments'):('Comment')}`}><Link><FontAwesomeIcon icon = {faComment}/></Link></Tippy>
                            <Link><FontAwesomeIcon icon = {faShare}/></Link>
                            <Link><FontAwesomeIcon icon = {faSave}/></Link>
                        </div>
                        
                      </div>
                      <PostComment postid = {post._id}/>
                    </div>
                    
                ))
            }
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
}

export default Post

