import React, { useEffect, useState } from 'react';
import "./styles.css";
import CreepScore from "./pictures/CreepScore.png"
import Gold from "./pictures/Gold-Coin-Transparent.png"
import Kda from "./pictures/kda.png"


const baseItemUrl = "./pictures/item/";

export default function Participant(props) {
    return (
    <>
        <div>{
         <>
            <img
                className="team-champion-icon"
                src={require(`./pictures/champion/${props.champion}.png`)}
            />
            <span id="participant-level">{props.level}</span>
         </>}
        </div>

        <div id="participant-summoner-name"
            style={{color: props.currentSummoner === props.summonerName? "gold" : "rgb(224, 223, 223)"}}
            onClick={() => {
                props.setSummonerName(props.summonerName);
                props.searchSummoner(props.summonerName);
                
                }}>
            <span>{props.summonerName}</span>
        </div>

        <div>{
         <>
            <img
            className="participant-summoner-spell"
            src={require(`./pictures/spell/${props.summonerSpell1}`)}
            />

            <img
            className="participant-summoner-spell"
            src={require(`./pictures/spell/${props.summonerSpell2}`)}
            />
         </>
        }
        </div>

        <div className="team-items-container">
               <img
                  className = "team-item-image"
                  src={require(baseItemUrl + `${props.item0 === 0? "7050" : props.item0}` + ".png")}
               />

               <img
                className = "team-item-image"
                src={require(baseItemUrl + `${props.item1 === 0? "7050" : props.item1}` + ".png")}
               />

               <img
                className = "team-item-image"
                src={require(baseItemUrl + `${props.item2 === 0? "7050" : props.item2}` + ".png")}
               />

                <img
                  className = "team-item-image"
                  src={require(baseItemUrl + `${props.item3 === 0? "7050" : props.item3}` + ".png")}
               />

                <img
                  className = "team-item-image"
                  src={require(baseItemUrl + `${props.item4 === 0? "7050" : props.item4}` + ".png")}
               />

                <img
                  className = "team-item-image"
                  src={require(baseItemUrl + `${props.item5 === 0? "7050" : props.item5}` + ".png")}
               />

                <img
                  className = "team-item-image"
                  src={require(baseItemUrl + `${props.item6 === 0? "7050" : props.item6}` + ".png")}
               />
        </div>

        <div
        style={{color: props.currentSummoner === props.summonerName? "gold" : "rgb(224, 223, 223)"}}>
            {`${props.kills}/${props.deaths}/${props.assists}`}
            <img
            id="participant-kda"
            src={Kda}/>
        </div>

        <div style={{color: props.currentSummoner === props.summonerName? "gold" : "rgb(224, 223, 223)"}}>
            {props.cs}
            <img
            id="participant-cs"
            src={CreepScore}/>
        </div>

        <div
        style={{color: props.currentSummoner === props.summonerName? "gold" : "rgb(224, 223, 223)"}}>
            {props.gold.toLocaleString('en-US')}
            <span>
            <img
            className="participant-stat-icon"
            src={Gold}/>
            </span>
        </div>
    </>
    )
}