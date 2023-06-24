import './videoInfo.css';

function VideoInfo(props){
    return(
        <div className="videoInfo">
            <div className="thumbnail">
                <img src={props.videoInfo.thumbnail}/>
            </div>
            <div className="videoDetails">
                <h2 className="videoTitle">{props.videoInfo.title}</h2>
                <h3 className="videoChannel">{props.videoInfo.channel}</h3>
                <p className="wordCount">Total Words: <b>{props.videoInfo.wordCount}</b></p>
            </div>
        </div>
    )
}

export default VideoInfo;