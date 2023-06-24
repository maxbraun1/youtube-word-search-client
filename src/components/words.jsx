import { useEffect, useState } from "react";
import Word from "./word.jsx";

function Words(props){
    const [highestWordCount, setHighestWordCount] = useState(0);

    useEffect(() => {
        setHighestWordCount(props.words[0].count);
    }, [props.words])
    return(
        <div className="words">
            {
                // Render Results
                props.words.map((item,index) => {
                    if(props.searchTerm == ""){
                        return(<Word key={index} item={item} highestWordCount={highestWordCount} videoURL={props.videoURL}></Word>)
                    }else{
                        if(item.word.toLowerCase().includes(searchTerm.toLowerCase())){
                        return(<Word key={index} item={item} highestWordCount={highestWordCount} videoURL={props.videoURL}></Word>)
                        }
                    }
                })
            }
        </div>
    )
}

export default Words;