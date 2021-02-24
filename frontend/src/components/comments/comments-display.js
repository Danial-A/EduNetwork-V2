import userEvent from '@testing-library/user-event'
import Axios from 'axios'
import React, {useState} from 'react'
import moment from 'moment'


import './comment.css'
function DisplayComments(postid) {
    // // const [comments, setComments] = useState([])
    // function getComments(){
    //     Axios.get(`http://localhost:5000/posts/${postid}/comments`)
    //     .then(comments => {
    //     //setComments(comment)
    //     console.log(comments)
    // })
    // .catch(err=> console.log(err))
    // }
    //  getComments()
    // console.log(postid)
    return (
        <div>
           <pre>Comments</pre>
          
        </div>
    )
}

export default DisplayComments
