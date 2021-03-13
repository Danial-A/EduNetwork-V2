import React from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import './groupsDisplayHome.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function GroupsDisplay() {
    const userid = localStorage.getItem('userid')
    const [groups,setGroups] = React.useState([])
    React.useEffect(async() => {
        try{
            const response =await axios.get(`http://localhost:8080/users/${userid}/groups`)
            setGroups(response.data)
        }catch(Err){
            console.log(Err)
        }
        
    }, [])
    return (
        <div style = {{color:"white"}} className  = "groups-main-container container">
            <div className="main-heading">
                <h4>Your Groups</h4>
                {groups.length > 0 ? (
                    groups.map((g,i)=>(
                        <div className = "text-crimson"><Link to = {`/group/${g._id}`}>{`${i+1}) ${g.title}`}</Link></div>
                    ))
                ) : <div className = "text-crimson">You have not joined any groups yet</div> }
            </div>
        </div>
    )
}

export default GroupsDisplay
