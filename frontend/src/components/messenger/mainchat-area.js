import React,{useState} from 'react'
import Message from './message'
import 'bootstrap/dist/css/bootstrap.min.css'
import './messenger.css'

function MainChatArea() {
    const [message,setMessage] = useState('')
    return (
        <div className = "main-chat-area">
        <div className="title">
            <h3>Messenger</h3>
        </div>
        <div className="chat-messages">
            <div className="container-fluid message-area">
             
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
            </div>
            <div className=" container-fluid send-message">
            <div class="input-group mb-3">
            <input type="text"
             class="form-control send-message-input" 
             placeholder="Type your message ....." 
             aria-label="Recipient's username" 
             aria-describedby="basic-addon2"
             value = {message}
             onChange = {e=> setMessage(e.target.value)}
             />
            <div class="input-group-append">
              <button className = "btn btn-danger">Send </button>
            </div>
          </div>
        </div>
            
        </div>
        </div>
    )
}

export default MainChatArea
