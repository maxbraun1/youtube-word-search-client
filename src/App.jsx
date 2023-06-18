import { useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';
import spinner from './assets/spinner.gif';
import clearSearch from './assets/clear-search.png';
import Word from './components/word';

function App() {
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [highestWordCount, setHighestWordCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  async function search(e){
    setError(null);
    setWords([]);
    setLoading(true);
    e.preventDefault();
    const videoID = videoURL.substring(videoURL.indexOf("v=") + 1, videoURL.indexOf("&")).replace("=","");
    axios.post("https://youtube-word-search-server.onrender.com/getCaptions", { id: videoID }).then((result)=>{
      handleResults(result.data);
    }).catch((error) => {
      setLoading(false);
      setError(error.response.data);
    })
  }

  function handleResults(result){
    setWords(result);
    setHighestWordCount(result[0].count);
    setLoading(false);
  }

  return (
    <main>
      <img className="logo" src={logo}/>
      <form>
        <input className="videoTextbox" type="text" placeholder="Video ID" onChange={(e) => setVideoURL(e.target.value)} value={videoURL}></input>
        <button className="find" onClick={search}>{ loading ? <img src={spinner} alt="loading" /> : "Find" }</button>
      </form>
      { loading ? <div className="results-loader"></div> : null }

      <div className="results">
        {
        // Add Search Bar
        words.length > 0 ? 
        <>
          <img onClick={() => {setSearchTerm("")}} className='search-clear' src={clearSearch}/>
          <input className="search" type="text" placeholder="Search for a word..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}></input>
        </>  
        : null
        }
        {
        // Render Results
        words ? words.map((item,index) => {
          if(searchTerm == ""){
            return(<Word item={item} highestWordCount={highestWordCount} index={index} videoURL={videoURL}></Word>)
          }else{
            if(item.word.toLowerCase().includes(searchTerm.toLowerCase())){
              return(<Word item={item} highestWordCount={highestWordCount} index={index} videoURL={videoURL}></Word>)
            }
          }
        }) : null
        }
        {
        // Error Message
        error == null ? null : <div className="error">{error}</div>
        }
      </div>
      <footer>Created by <a target="_blank" href="https://maxbraun.us">Max Braun</a></footer>
    </main>
  )
}

export default App
