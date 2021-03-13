import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './messenger.css'
function ChatSidePanel(props) {
    const [chats,setChats] = useState([])
    useEffect(() => {
       if(props.chats !== undefined){
           setChats(props.chats)
       }
    }, [])
    return (
        <div className = "side-panel-main">
            <div className="title">
                <h3>Chats</h3>
            </div>
            <div className="chat-list mt-3">
                <ul>
                    {chats.length > 0 ? (
                        chats.map(chat=>(
                            <Link to = {`/messenger/${chat._id}`}><li>{chat.participants.firstParticipantID}</li></Link>
                        ))
                    ) : <div>No chats yet</div>
                }
                </ul>
            </div>
        </div>
    )
}

export default ChatSidePanel
