import React, {useState,useEffect} from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import userSearch from '../components/user-search-component/userSearch'
import Footer from '../components/footer-section/footer'
import axios from 'axios'
import Post from '../components/post-component/post'
import './UserProfile.css'
import io from 'socket.io-client'

function UserHomePage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    

    const socket = io('http://localhost:8080')
    // socket.on('connection', ()=>{
    //     console.log('I am connected to the backend')
    // })

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
            <userSearch/>
            <Post posts = {posts} loading= {loading} />
            <Footer/>
        </div>
    )
}

export default UserHomePage
