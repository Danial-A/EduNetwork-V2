import Axios from 'axios'
import React, {useState,useEffect} from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import './comment.css'


import './comment.css'
function DisplayComments(postid) {
    const [comments, setComments] = useState([])
    useEffect(()=>{
        Axios.get(`http://localhost:8080/posts/${postid.postid}/comments`)
        .then(res => {
        setComments(res.data)
    })
    .catch(err=> console.log(err))
    },[])
    console.log(comments)
    return (
        <div className = "display-comments container">
           <h4 style = {{color:"black" ,padding:"5px"}}>Comments: </h4>
                {
                    comments.map(comment=>(
                        <div className="comment">
                        <div className="comment-side">
                            <pre><strong>{comment.username}:</strong> </pre>
                            <p> {comment.body}</p>

                        </div>
                        <div className="created-siz">
                            <pre><strong>Created: </strong> {moment(comment.createdAt).fromNow()}</pre>
                        </div>
                            

                        </div>
                    ))
                }
      
        </div>
    )
}

export default DisplayComments
