import { useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';
import spinner from './assets/spinner.gif';
import Words from './components/words';
import VideoInfo from './components/videoInfo';

function App() {

  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  async function search(e){
    setError(null);
    setWords([]);
    setLoading(true);
    e.preventDefault();

    // Determine Video ID
    let videoID;

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

    // Get Data from Server
    axios.post(import.meta.env.VITE_SERVER + "/getCaptions", { id: videoID }).then((result)=>{
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
      <img className="logo" src={logo}/>
      <h1 className="site-title">Word Counter and Finder for YouTube Videos</h1>
      <form>
        <input className="videoTextbox" type="text" placeholder="Video URL" onChange={(e) => setVideoURL(e.target.value)} value={videoURL}></input>
        <button className="find" onClick={search}>{ loading ? <img src={spinner} alt="loading" /> : "Find" }</button>
      </form>

      { loading ? <div className="results-loader"></div> : null }

      <div className="results">
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
    </main>
    </>
  )
}

export default App
