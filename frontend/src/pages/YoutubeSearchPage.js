import React, {useState} from 'react'
import SearchComponent from '../components/YT-Data/Search'
import YTPage from '../components/YT-Data/YT-Data-API-Result'
import NavigationBar from '../components/navigation-bar/userNavbar'
import YoutubeApi from '../components/YT-Data/Api'


function YoutubeSearchPage() {

    const [videoMetaInfo, setVideoMetaInfo] = useState([])
    const [selectedVideoId, setSelectedVideoId] = useState(null)

    const onSearch = async (keyword) =>{
        const response = await YoutubeApi.get("/search",{
            params:{
                q:keyword
            }
        })
        console.log(response)
    }

    return (
        <div>
            <NavigationBar/>
            <SearchComponent onSearch = {onSearch}/>
            <YTPage/>
        </div>
    )
}

export default YoutubeSearchPage
