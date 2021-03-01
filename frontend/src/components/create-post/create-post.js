import React, {useState,useEffect,useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './create-post.css'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
function UserPost(TotalPosts) {

    const {totalPosts, setPosts} = useState(TotalPosts);
    // console.log(Cookies.get('username'))
    const initialValues = {
        title: '',
        body: '',
        author: Cookies.get('username'),
        postType: 'profile'
    }
    const onSubmit = values =>{
        axios.post('http://localhost:5000/posts/add', values)
        .then(res =>{
            // window.alert("Post Added!");
            console.log(res)
            setPosts([...totalPosts])
        })
        .catch(err =>{ console.log("Error: "+err)})
        console.log(values)
    }
    const validationSchema = Yup.object({
        title: Yup.string().required('This field is required..'),
        body: Yup.string().required('This field is required..')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div>
            <div className="container">
            <h3 style = {{color:'white'}}>Create a new post..</h3>
            <form onSubmit = {formik.handleSubmit}>
                <div className="row">
                <div className="col post-heading">
                    <label htmlFor="postheading" style= {{color:'white'}}>Post Heading:</label>
                    <input type="text" name="title" id="title" style = {{width: "100%"}}
                        placeholder ="Enter the post title..."
                        onChange = {formik.handleChange}
                        onBlur = {formik.onBlur}
                        value = {formik.values.title}
                    />
                    {formik.errors.heading && formik.touched.title ? <div style = {{color: 'crimson'}}><p>{formik.errors.heading}</p></div> : null}
                </div>
                </div>
                <div className="row">
                <div className="col">
                    <div className="post-body">
                        <label htmlFor="body" style= {{color:'white'}}>Post Body: </label>
                        <textarea name="body" id="body" rows="6" 
                        placeholder = "Enter the post description...."
                        onChange = {formik.handleChange}
                        onBlur = {formik.onBlur}
                        value = {formik.values.body}
                        />
                        {formik.errors.body && formik.touched.body ? <div style = {{color: 'crimson'}}><p>{formik.errors.body}</p></div> : null}
                    </div>
                    </div>
                </div>
                <div className="add-post-button">
                    <button type = "submit">Add Post!</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default UserPost
