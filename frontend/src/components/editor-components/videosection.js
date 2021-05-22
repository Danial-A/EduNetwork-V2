import React from 'react'

function VideoSection(url) {
    console.log(url)
    return (
      
          url ?  <iframe src={url} frameborder="0" allowFullScreen title="Video player"></iframe> : <h3>No video selected</h3>
          
      
    )
}

export default VideoSection
