import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainChatArea from '../components/messenger/mainchat-area' 
import SideChatPanel from '../components/messenger/sidechat-panel' 
import NavigationBar from '../components/navigation-bar/userNavbar'
function Messenger({match}) {
    const uid = localStorage.getItem('userid')
    const [user,setUser] = useState({})
    useEffect(async()=>{
        try{
            const response = await axios.get(`http://localhost:8080/users/${uid}`)
            //console.log(response.data)
            setUser(response.data)
        }catch(err){
            console.log(err)
        }
        

    },[])

    // console.log(user)
    // const chatid =match.params.id 
    // console.log(chatid)
    return (
        <div className = "container-fluid ">
        <NavigationBar/>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <SideChatPanel chats = {user.chats}/>
                </div>
                <div className="col-md-8">
                    <MainChatArea/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Messenger
