import userEvent from '@testing-library/user-event'
import Axios from 'axios'
import React, {useState} from 'react'
import moment from 'moment'


import './comment.css'
function DisplayComments(postid) {
    // let [comments, setComments] = useState([])
    // Axios.get(`http://localhost:5000/comments/${postid}`)
    // .then(comment => {
    //     setComments(comment)
    //     console.log(comments)
    // })
    // .catch(err=> console.log(err))
    return (
        <div>
           <pre>Comments</pre>
          
        </div>
    )
}

export default DisplayComments
