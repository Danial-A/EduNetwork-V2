import React, {useState,useEffect} from 'react'
import NavigationBar from '../components/navigation-bar/userNavbar'
import Footer from '../components/footer-section/footer'
import axios from 'axios'
import Post from '../components/post-component/post'
import './UserProfile.css'
function UserHomePage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    

    useEffect(()=>{
        const fetchPosts = async ()=>{
            setLoading(true);
            const response = await axios.get('http://localhost:5000/posts/');
            setPosts(response.data);
            setLoading(false)
        }
        fetchPosts()
    }, []);
    
    return (
        <div style ={{backgroundColor: '#1c2237'}}>
            <NavigationBar/>
            <Post posts = {posts} loading= {loading} />
            <Footer/>
        </div>
    )
}

export default UserHomePage
