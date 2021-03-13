import React from 'react'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import './comment.css'
import './comment.css'
function DisplayComments(props) {
    
    return (
        <div className = "display-comments container">
           <h4 style = {{color:"black" ,padding:"5px"}}>Comments: </h4>
                {
                    props.comments.length > 0 ? (props.comments.map(comment=>(
                        <div className="comment" key ={comment._id}>
                        <div className="comment-side">
                            <pre><strong>{comment.username}:</strong> </pre>
                            <p> {comment.body}</p>

                        </div>
                        <div className="created-side">
                            <pre><strong>Created: </strong> {moment(comment.createdAt).fromNow()}</pre>
                        </div>
             </div>
                    ))) : <div>No Comments yet..</div>
                }
      
        </div>
    )
}

export default DisplayComments

{/*useEffect(async()=>{
    try{
        if(props.comments.length > 0){
            setComments(props.comments)
        }
    }catch(err){

    }
        
    //     if(props.postid){
    //         const response =await Axios.get(`http://localhost:8080/posts/${props.postid}/comments`)
    //         response.then(res=> {
    //         setComments(res.data)
    //     }).catch(err=> console.log(err))
    //     }else{
            
    //     }  
    // }catch(err){
    //     console.log(err)
    // }
    
},[])*/}