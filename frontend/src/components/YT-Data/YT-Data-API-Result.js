import React,{useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import YouTube from 'react-youtube'
import './yt.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

function YTPage(props) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
    React.useEffect(()=>{
        
    },[])
    
    const youtubePlayer = ()=>{
        const videoOnReady = (event)=>{
            event.target.pauseVideo();
        }
        const videoId = "2TilZlxSZHM"
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            }
        }
        return <YouTube videoId = {videoId} opts = {opts} onReady = {e => videoOnReady(e)}/>
    }

    return (
        <>
        <div style = {{color:"white"}}>
            <ul>
            
            </ul>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
          </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><youtubePlayer/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
          </>
      );
}

export default YTPage
