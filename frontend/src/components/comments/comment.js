import React from 'react'
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import './comment.css'
import DisplayComments from './comments-display'
function PostComment({postid}) {
    const initialValues = {
        username: Cookies.get('username'),
        body: ''
    }

    const validationSchema = Yup.object({
        body: Yup.string().required('This field is required..')
    })

    
    const onSubmit = (values, onSubmitProps) =>{
         axios.post(`http://localhost:5000/posts/${postid}/comment/add`,values)
         .then(res => {
             console.log(res.data)
             window.alert('Comment Added!');
             window.location.reload(false);

         })
         .catch(err => console.log(err))
        onSubmitProps.resetForm()
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });



    return (
        <div>
        <div className="comments-section">
            <DisplayComments postid = {postid}/>
        </div>
            <div className ="container" style ={{borderTop:"1px solid black", padding: "15px 0"}}>
            <form onSubmit = {formik.handleSubmit}>
                    <label htmlFor="comment">Add a comment: </label>
                    <input type="text" className = "form-control comment-input" name = "body" id = "body"
                    value = {formik.values.body} 
                    onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}
                    />
                    {formik.errors.body && formik.touched.body ? <div ><p style = {{color: 'crimson'}}>{formik.errors.body}</p></div> : null}
                    <div className="comment-btn" style = {{marginTop:"8px"}}>
                        <button className = "btn btn-danger" type = 'submit'>Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostComment
