import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import logo from './assets/logo.png';
import spinner from './assets/spinner.gif';
import backArrow from './assets/back-arrow.png';
import Words from './components/words';
import VideoInfo from './components/videoInfo';
import PopularSearches from './components/popularSearches';

function App() {

  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if(searchParams.get("videoID")){
      search(searchParams.get("videoID"));
    }
  }, []);

  async function search(videoID){
    setError(null);
    setWords([]);
    setLoading(true);

    if(!videoID){
      // Determine Video ID
      if(videoURL.includes("&")){
        videoID = videoURL.substring(videoURL.indexOf("v=") + 1, videoURL.indexOf("&")).replace("=","");
      }else if(videoURL.includes("https://youtu.be/")){
        videoID = videoURL.split('youtu.be/')[1];
        console.log("Video ID (youtu.be/)", videoID);
      }
      else{
        videoID = videoURL.split('v=')[1];
        console.log("Video ID (No &)", videoID);
      }
    }

    // Get Data from Server
    axios.post(import.meta.env.VITE_SERVER + "/getCaptions", { id: videoID, url: videoURL }).then((result)=>{
      handleResults(result.data);
    }).catch((error) => {
      setLoading(false);
      setError(error.response.data);
    })
  }

  function handleResults(result){
    setWords(result.words);
    setVideoInfo(result.videoInfo);
    setLoading(false);
  }

  return (
    <>
    <main>
      <img className="logo" src={logo} alt="YouTube Word Search Logo"/>
      <h1 className="site-title">Word Counter and Finder for YouTube Videos</h1>
      <form>
        <input className="videoTextbox" type="text" placeholder="Video URL" onChange={(e) => setVideoURL(e.target.value)} value={videoURL}></input>
        <button className="find" onClick={(e) => {e.preventDefault(); search()}}>{ loading ? <img src={spinner} alt="loading" /> : "Find" }</button>
      </form>

      { loading ? <div className="results-loader"></div> : null }

      <div className="results">
        { words.length > 0 ? <a className="backArrow" href="/"><img src={backArrow}/>Back</a> : null}
        { words.length > 0 ? <VideoInfo videoInfo={videoInfo} /> : null }
        {
        // Add Search Bar
        words.length > 0 ? 
        <input className="search" type="text" placeholder="Search for a word..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}></input>
        : null
        }
        
        { words.length > 0 ? <Words words={words} videoURL={videoURL} searchTerm={searchTerm} /> : null }
        {
        // Error Message
        error == null ? null : <div className="error">{error}</div>
        }
      </div>

      { words.length > 0 ? null : <PopularSearches/> }
    </main>
    </>
  )
}

export default App
