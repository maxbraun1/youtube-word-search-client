import axios from 'axios';
import { useState, useEffect } from 'react';
import './popularSearches.css';

function PopularSearches(){

    const [searches, setSearches] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER + "/getPopular").then((response) => {
            setSearches(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return(
        <div className="popularSearches">
            <h1>Popular Searches</h1>
            {
                searches.length > 0 ? searches.map((search) => {
                    return(
                        <a href={"/?videoID=" + search.videoID} className="popularSearch" key={search._id}>
                            <img className="popularSearchThumbnail" src={search.videoThumbnail}/>
                            <h2 className="popularVideoTitle">{search.videoTitle}</h2>
                            <h3 className="popularVideoChannel">{search.videoChannel}</h3>
                        </a>
                    )
                }) : null
            }
        </div>
    )
}

export default PopularSearches;