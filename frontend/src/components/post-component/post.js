import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Axios from 'axios'
import Tippy from '@tippy.js/react'
import { faThumbsUp, faComment, faShare, faSave, faTrash,faEdit,faArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import './post.css'
import PostComment from '../comments/comment'
import 'tippy.js/dist/tippy.css'
import Cookies from 'js-cookie'

function Post({posts, loading}) {

    const [liked, setLiked] = useState(false)
    const checkLike = (postid)=>{
    Axios.post(`http://localhost:5000/posts/${postid}/like`, {username:Cookies.get('username')})
    .then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
  
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
                            <Link ><FontAwesomeIcon icon = {faTrash} onClick = {()=>DeletePost(post._id)}/></Link>
                            <Link><FontAwesomeIcon icon = {faEdit} /></Link>
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
        </div>
    )
}

export default Post

