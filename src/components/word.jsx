import downArrow from '../assets/down-arrow.png';
import { useState } from 'react';

function Word(props){
    const [open, setOpen] = useState(false);
    
    let item = props.item;
    let index = props.index;

    function offsetToTimeLink(offset){
        let secondsOffset = parseInt(offset / 1000);
        let minutes = Math.floor(secondsOffset/60).toString();
        let seconds = (secondsOffset % 60).toString();

        if(minutes.length < 2){
            minutes = "0" + minutes.toString();
        }
        if(seconds.length < 2){
            seconds = "0" + seconds.toString();
        }
        return props.videoURL + "&t=" + minutes + "m" + seconds + "s";
    }

    function offsetToTimeText(offset){
        let secondsOffset = parseInt(offset / 1000);
        let minutes = Math.floor(secondsOffset/60).toString();
        let seconds = (secondsOffset % 60).toString();

        if(minutes.length < 2){
            minutes = "0" + minutes.toString();
        }
        if(seconds.length < 2){
            seconds = "0" + seconds.toString();
        }
        return minutes + ":" + seconds;
    }

    return(
        <div className={open ? 'word word-open' : 'word'} key={index}>
            <div className="info" onClick={() => setOpen(!open)}>
                <div className="bar" style={{ width: parseInt(item.count/props.highestWordCount * 100) + "%"}}></div>
                <span>{item.word} <span className="count">{item.count}</span></span>
                <img className={ open ? "word-dropdown-arrow up" : "word-dropdown-arrow" } src={downArrow}/>
            </div>
            { open ? 
                <div className="dropdown">
                    { props.item.locations.map((location) => {
                        return(<p><a target="_blank" href={offsetToTimeLink(location.offset)}>{offsetToTimeText(location.offset)}</a> - {location.phrase} </p>)
                    })}
                </div>
            :
            null
            }
            
        </div>
    )
}

export default Word;