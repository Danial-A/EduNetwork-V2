import React from "react";
import {Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
       <h1 style = {{color:"white"}}>Enter search keyword to load...</h1>
       <br></br>
    </div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(video.id.videoId);
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
        <Link className = "btn btn-danger" to = {`/playground/${video.id.videoId}`}>Start Coding?</Link>
      </div>
    </div>
  );
};

export default VideoDetail;
