import React, {useState,useEffect} from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import io from 'socket.io-client'
import Footer from '../components/footer-section/footer'
import axios from 'axios'
import Post from '../components/post-component/post'
import SearchPanel from '../components/userSearch/searchPanel'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserProfile.css'


function UserHomePage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    
    const socket = io('http://localhost:8080')
    socket.on('connection', ()=>{
        console.log('I am connected to the backend')
    })
   
    useEffect(()=>{
        const fetchPosts = async ()=>{
            setLoading(true);
            const response = await axios.get('http://localhost:8080/posts/');
            setPosts(response.data);
            setLoading(false)
        }
        fetchPosts()
    }, []);
    
    return (
        <div style ={{backgroundColor: '#1c2237'}}>
       
            <NavigationBar/>
            <div className="container-fluid user-home-container">
            <div className="row">
                <div className="col-md-3">
                    <SearchPanel/>
                </div>
                <div className="col-md-8">
                <Post posts = {posts} loading= {loading} />
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default UserHomePage
