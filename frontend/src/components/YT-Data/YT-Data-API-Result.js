import React from 'react'
import './yt.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

function YTPage(props) {
    const [users,setUsers] = React.useState([])
    React.useEffect(()=>{
        axios.get('http://localhost:8080/users/')
        .then(res=> {
            setUsers(res.data)
            
        })
        .catch(err=> console.log(err))
    },[])
    console.log(props.location.path)
    return (
        <div style = {{color:"white"}}>
            <ul>
                {/*
                    users.map(user=>(
                        <li key = {user._id}><Link to = {`${props.location.path}/${user.user_id}`}>{user.username}</Link></li>
                    ))
                    */}
            </ul>
          </div>
      );
}

export default YTPage
