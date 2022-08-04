import React from 'react';
import "./styles.css"
import Placeholder from "./pictures/profileicon/0.png"

const baseIconUrl = "./pictures/profileicon/"

export default function SummonerDisplay(props) {

    return (
        <div className="summoner-info-container">
            <div id="summoner-name">
                {props.summonerName}
            </div>
            
             <img 
               id="summoner-icon" 
               src={require(baseIconUrl + `${props.summonerIcon}` + ".png")}
               placeholder={Placeholder}
             />
             

             <div id="summoner-level">
                 {props.summonerLevel}
             </div>   
        </div>
    )
}