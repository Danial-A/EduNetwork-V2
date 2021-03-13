import React, {useState,useEffect} from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Tippy from '@tippy.js/react'
import { faThumbsUp, faComment, faShare, faSave, faTrash,faEdit,faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostComment from '../components/comments/comment'
import DisplayComments from '../components/comments/comments-display'
import {Button} from 'react-bootstrap'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../components/post-component/post.css'
import 'tippy.js/dist/tippy.css'

function PostPage(props) {
  // console.log(props.match.params.id)
  const [post,setPost] = useState({})
  const [comments,setComments] = useState([])
  useEffect(()=>{
      axios.get(`http://localhost:8080/posts/post/${props.match.params.id}`)
      .then(res=> {
        setPost(res.data)
        setComments(res.data.comments)
      })
      .catch(err=> console.log(err))
  },[])
    return (
        <div>
            <NavigationBar/>
            <Button variant = "danger">
            <Link to = "/Home"
             style = {{textDecoration:"none",color:"white"}}>
             Go back</Link>
             </Button>
            <div className="container-fluid posts-section">
                    <div className="post-container container">
                      <div className="row user-info-row">
                        <div className="col-md-6">
                           <span className = "user-heading">User: {post.author}</span> 
                        </div>
                        <div className="col-md-6 created-at">
                            <pre><strong>Created: {moment(post.createdAt).fromNow()}</strong> </pre>
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
                            <Link ><FontAwesomeIcon  icon = {faTrash}/></Link>
                            <Link><FontAwesomeIcon icon = {faEdit}/></Link>
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
                           <Tippy content = "1"><Link><FontAwesomeIcon icon = {faThumbsUp}/></Link></Tippy>
                           <Tippy content = "1"><Link><FontAwesomeIcon icon = {faComment}/></Link></Tippy>
                            <Link><FontAwesomeIcon icon = {faShare}/></Link>
                            <Link><FontAwesomeIcon icon = {faSave}/></Link>
                        </div>
                        
                      </div>
                      
                    </div>
        </div>
        <div className="display-postcomments">
          <DisplayComments comments = {comments}/>
        </div>
        <div className="post-comments" style = {{color:"white"}}>
          <PostComment postid = {post._id} />   
        </div>
        </div>
    )
}

export default PostPage
