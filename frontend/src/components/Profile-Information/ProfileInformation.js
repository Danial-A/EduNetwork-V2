import React,{useState,useEffect} from 'react'
import '../../pages/UserProfile.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faThumbsUp, faUsers, faTasks} from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import {Tabs, Tab} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function ProfileInformation() {
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([])

    const userid = Cookies.get('user')
    useEffect(()=>{
        //Get user posts
        axios.post('http://localhost:8080/posts/user/posts', {author: Cookies.get('username')})
        .then(posts=> {
            // console.log(posts)
            setPosts(posts)
        })
        .catch(err => console.log(err))

        //get following
        axios.get(`http://localhost:8080/users/${userid}/following`)
        .then(res=> {
            setFollowing(res.data)
        })
        .catch(err=> console.log(err))

        //Get followers
        axios.get(`http://localhost:8080/users/${userid}/followers`)
        .then(res=> {
            setFollowers(res.data)
        })
        .catch(err=> console.log(err))
    },[])

   
    console.log(followers)
    return (
        <div className="user-info">
            <div className="user-heading"> 
                <h3>Profile Information</h3>
            </div>
            <div className="information-section">
                <ul>
                    <li><Link><FontAwesomeIcon icon = {faEdit} className = "icon"/>Posts {(posts.length)}</Link></li>
                    <li><Link><FontAwesomeIcon icon = {faThumbsUp} className = "icon"/>Likes </Link></li>
                </ul>
                <div className="followers-following-section">
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Followers">
                        <ol style = {{color:"white"}} className = "follower-section">
                        {followers.map(f=>(
                            <li><Link>{f.firstname} {f.lastname}</Link></li>
                        ))}
                    </ol>
                        
                        </Tab>
                        <Tab eventKey="profile" title="Following">
                            <ol style = {{color:"white"}} >
                                {following.map(f=>(
                                    <li><Link>{f.firstname} {f.lastname}</Link></li>
                                ))}
                            </ol>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ProfileInformation
