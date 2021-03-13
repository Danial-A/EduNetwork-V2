import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
function GroupPage({match}) {
    const gid = match.params.id
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        const response = axios.post()
    })
    return (
        <div style = {{color:"white"}}>
            Hello Jee this is a group
        </div>
    )
}

export default GroupPage
