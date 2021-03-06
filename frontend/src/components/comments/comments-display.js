import userEvent from '@testing-library/user-event'
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

    return (
        <div className = "display-comments container">
           <h4 style = {{color:"black" ,padding:"5px"}}>Comments: </h4>
                {
                    comments.map(comment=>(
                        <div className="comment">
                        <pre>{comment.username}: </pre>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, aperiam.</p>
                        </div>
                    ))
                }
      
           
        </div>
    )
}

export default DisplayComments
