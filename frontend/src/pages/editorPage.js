import React from 'react'
import '../components/editor-components/editor.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from '../components/navigation-bar/userNavbar'
import Footer from '../components/footer-section/footer'
import Editor from "@monaco-editor/react";
import OutputSection from '../components/editor-components/outputsection'
import VideoSection from '../components/editor-components/videosection'

function EditorPage() {
    function handleEditorChange(value, event) {
        console.log(value);
      }
      const [theme,setTheme] = React.useState('vs-dark')
      const toggleTheme = ()=> {
          if(theme === 'light'){
            setTheme('vs-dark')
          }else{
              setTheme('light')
          }
      }
    return (
        <div>
        <NavigationBar/>
            <div className="container-fluid">
            <button onClick = {toggleTheme}>Change Theme</button>
                <div className="row">
                    <div className="col-md-6" style = {{padding:'0'}}>
                    <Editor
                    height="85.76vh"
                    defaultLanguage="javascript"
                    defaultValue="// Start writting code below this line.."
                    onChange={handleEditorChange}
                    theme = {theme}
                />
                
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col video-section">
                                <VideoSection/>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col output-section">
                                <OutputSection/>
                            </div>
                        </div>
                            
                        
                    </div>
                </div>
            </div>
            <Footer/>
            
        </div>
    )
}

export default EditorPage
