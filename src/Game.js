import React, { useEffect, useState } from 'react';
import "./styles.css"
import CreepScore from "./pictures/CreepScore.png"
import Gold from "./pictures/Gold-Coin-Transparent.png"
import Kda from "./pictures/kda.png"
import Team from "./Team"


const baseItemUrl = "./pictures/item/";

export default function Game(props) {
   const [showTeamStats, setShowTeamStats] = useState(false);


   return (
   <div className="overall-container">   
    <div className="game-container" onClick={() => {
      setShowTeamStats(prevState => !prevState);
      }}
         style={{backgroundColor: props.victory ? 'rgba(5,90,140, .60)' : 'rgba(211,29,12, 0.5)' }}>

         {/*Flex item 1: Champion and level*/}
         <div id="champion-and-level-container">
            <img
                id="champion-icon"
                src={require(`./pictures/champion/${props.championName}.png`)}
            />
         <span id="champion-level">
            {props.championLevel}
         </span>
        </div>

        {/*Flex item 2: Victory status, queue type, and summoner spells*/}
        <div className="victory-status-container">
         <div id="victory-status">{props.victory? "VICTORY" : "DEFEAT"}</div>
         <div id="game-type">{props.gameType}</div>
         <div id="summoner-spells-container">
          <img
             id="summoner-spell-1"
             src={require(`./pictures/spell/${props.summonerSpell1}`)}
          />

          <img
             id="summoner-spell-2"
             src={require(`./pictures/spell/${props.summonerSpell2}`)}
          />
         </div>
        </div>
         
        {/*Flex item 3: Items, K/D/A, CS, Gold*/}
        <div className="item-kda-cs-gold-container">
            <div id="items-container">
               <img
                  id="item-0"
                  src={require(baseItemUrl + `${props.items.item0}` + ".png")}
               />
               <img
                  id="item-1"
                  src={require(baseItemUrl + `${props.items.item1}` + ".png")}
               />
               <img
                  id="item-2"
                  src={require(baseItemUrl + `${props.items.item2}` + ".png")}
               />
               <img
                  id="item-3"
                  src={require(baseItemUrl + `${props.items.item3}` + ".png")}
               />
               <img
                  id="item-4"
                  src={require(baseItemUrl + `${props.items.item4}` + ".png")}
               />
               <img
                  id="item-5"
                  src={require(baseItemUrl + `${props.items.item5}` + ".png")}
               />
               <img
                  id="item-6"
                  src={require(baseItemUrl + `${props.items.item6}` + ".png")}
               />
            </div>

            <div id="kda-cs-gold-container">
               <span id="kda">
                  {`${props.kills}/${props.deaths}/${props.assists}`}
                  <img
                  src={Kda}/>
               </span>

               <span id="creep-score">
                  {`${props.creepScore} `}
                  <img
                     id="creep-score-image"
                     src={CreepScore}/>
               </span>

               <span id="gold-earned">
                  {` ${props.goldEarned.toLocaleString('en-US')}`}
                  <img
                     src={Gold}/>
               </span>
            </div>
         </div> 

         {/*Flex item 4: Map, Match length, Date*/}
         <div id="map-date-container">
            <div id="map-name">
               {props.map}
            </div>   
            <div id="duration-and-date-container">
             <span id="game-duration">
                {props.gameDuration}
             </span>

             <span id="game-date">
                {props.gameDate}
             </span>
            </div>
         </div>
    </div> 

      {showTeamStats && 
        <div className="fade-in-and-out">
          <div className="team-header-container">
            <div>Team 1</div>
            <div>
               {`${props.teamOneKills}/${props.teamOneDeaths}/${props.teamOneAssists}`}
               <img
               id="team-header-kda"
               src={Kda}/>
            </div>
            <div>{props.teamOneGold.toLocaleString('en-US')}
               <img
               id="team-header-gold"
               src={Gold}/>
            </div>          
         </div>

          <Team
            participants={props.teamOne}
            victory={props.teamOne[0].win}
            summonerSpellMap={props.summonerSpellMap}
            currentSummoner ={props.currentPlayer}
            teamKills={props.teamOneKills}
            teamDeaths={props.teamOneDeaths}
            teamAssists={props.teamOneAssists}
            teamGold={props.teamOneGold}

            searchSummoner={props.searchSummoner()}
            setSummonerName={props.setSummonerName()}
          />

         
         <div className="team-header-container">
            <div>Team 2</div>
            <div>
               {`${props.teamTwoKills}/${props.teamTwoDeaths}/${props.teamTwoAssists}`}
               <img
               id="team-header-kda"
               src={Kda}
               />
            </div>
            <div>{props.teamTwoGold.toLocaleString('en-US')}
               <img
                  id="team-header-gold"
                  src={Gold}
               />
            </div>
         </div>


          <Team
           participants={props.teamTwo}
           victory={props.teamTwo[0].win}
           summonerSpellMap={props.summonerSpellMap}
           currentSummoner ={props.currentPlayer}
           teamKills={props.teamTwoKills}
           teamDeaths={props.teamTwoDeaths}
           teamAssists={props.teamTwoAssists}
           teamGold={props.teamTwoGold}

           searchSummoner={props.searchSummoner()}
           setSummonerName={props.setSummonerName()}
            />
            
         </div>}
    </div>
   ) 
}