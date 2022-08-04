import React, { useEffect, useState } from 'react';
import Game from "./Game"
import SearchBar from "./SearchBar"
import Footer from "./Footer"
import SummonerDisplay from "./SummonerDisplay"
import "./styles.css";
import Logo from "./pictures/TeemoWalk.gif";


//Flask API domain
const domain = 'http://192.168.4.24:5000'

const itemIdPlaceholder = 7050;
let matchIds = [];
let matchInfo = [];
let puuid;
let gameElements = [];
let summonerComponent;

//Fetch Riot's current list of queue types
let queues = new Map();
fetch("https://static.developer.riotgames.com/docs/lol/queues.json")
  .then(response => response.json())
  .then(data => {
    let queueDescription
    data.forEach((queueObject) => {
      try {
        queueDescription = queueObject.description.replace('games', '');
      }
      catch{queueDescription = 'Custom'}
      let value = {description: queueDescription,
                   map: queueObject.map,
                   notes: queueObject.notes};
      queues.set(queueObject.queueId, value);
    })
  }  
);

//Fetch Riot's current list of summoner spells
let summonerSpells = new Map();
fetch("https://ddragon.leagueoflegends.com/cdn/12.13.1/data/en_US/summoner.json")
  .then(response => response.json())
  .then(object => {
    Object.keys(object.data).forEach(ref => summonerSpells.set(parseInt(object.data[ref].key), 
      object.data[ref].image.full))    
    });


function App() {
  const [matchIndexStart, setMatchIndexStart] = useState(0);
  const [matchIndexCount, setMatchIndexCount] = useState(10);
  const [summonerName, setSummonerName] = useState("");
  const [summonerObject, setSummonerObject] = useState("");
  const [region, setRegion] = useState("americas");
  const [reRender, setReRender] = useState(false);


  //Get summoner's PUUID via SUMMONER-V4 API
  let searchSummoner = async () => {
    gameElements = [];
    summonerComponent = null;
    let response = await fetch(`${domain}/getSummoner/${summonerName}`);
    let data = await response.json();
    console.log(data);
    setSummonerObject(data);
    generateSummoner(data);
    puuid = data.puuid;

    //Get summoner's recent match ids via MATCH-V5 API
    response = await fetch(`${domain}/getMatchIds/${region}/${puuid}?start=${matchIndexStart}&count=${matchIndexCount}`);  
    data = await response.json();
    console.log(data);
    matchIds = data;
    matchInfo = [];

    //Get summoner's recent game information via {blank}
    for(let i=0; i < matchIds.length; i++) {
      response = await fetch(`${domain}/getMatchInfo/${region}/${matchIds[i]}`);
      if(response.status === 200) {  
        data = await response.json();
        matchInfo[i] = data; }
      // getChampionFromMatchInfo(data);
    }

    generateMatches();

    setReRender(!reRender);
  }

  
const generateSummoner = (data) => {
  summonerComponent = 
  <SummonerDisplay
    summonerName = {data.name}
    summonerLevel = {data.summonerLevel}
    summonerIcon = {data.profileIconId}
    />
}

const generateMatches = () => {
  gameElements = [];
  let queueId;
    for (let i = 0; i < matchInfo.length; i++) {
      queueId = getQueueIdFromMatchInfo(matchInfo[i]);
      let playerSpells = getSummonerSpellsFromMatchInfo(matchInfo[i]);
      let playerItems = getItemsFromMatchInfo(matchInfo[i]);
      validateItems(playerItems);

      gameElements[i] = 

        <Game 
         matchNumber={matchInfo[i].metadata.matchId}
         championName={getChampionFromMatchInfo(matchInfo[i])}
         championLevel={getChampionLevelFromMatchInfo(matchInfo[i])}
         victory={getVictoryStatusFromMatchInfo(matchInfo[i])}
         gameType={queues.get(queueId).description}

         summonerSpell1={
          playerSpells.summoner1 > 10000? "Summoner_UltBookPlaceholder.png" :
          summonerSpells.get(playerSpells.summoner1)}
         summonerSpell2={
          playerSpells.summoner2 > 10000? "Summoner_UltBookPlaceholder.png" :
          summonerSpells.get(playerSpells.summoner2)}

         items={playerItems}

         kills={getKillsFromMatchInfo(matchInfo[i])}
         deaths={getDeathsFromMatchInfo(matchInfo[i])}
         assists={getAssistsFromMatchInfo(matchInfo[i])}

         creepScore={getCreepScoreFromMatchInfo(matchInfo[i])}
         goldEarned={getGoldEarnedFromMatchInfo(matchInfo[i])}

         map={queues.get(queueId).map}
         gameDuration={getGameDurationFromMatchInfo(matchInfo[i])}
         gameDate={getGameDateFromMatchInfo(matchInfo[i])}
        />;
     }
}

const getVictoryStatusFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
  for (let i = 0; i < participants.length; i++) {
    if(participants[i].puuid == puuid) {
      return participants[i].win;
    }
  }
}

const getQueueIdFromMatchInfo = (matchObject) => {
  console.log(matchObject.info.queueId + typeof matchObject.info.queueId)
  return matchObject.info.queueId;
}

const getChampionFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
  for (let i = 0; i < participants.length; i++) {
    if(participants[i].puuid == puuid) {
      return participants[i].championName
    }
  }
}

  const getChampionLevelFromMatchInfo = (matchObject) => {
    const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return participants[i].champLevel;
      }
    }
}

const getSummonerSpellsFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return {summoner1: participants[i].summoner1Id, 
                summoner2: participants[i].summoner2Id}
      }
    }
}

const getItemsFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return {item0: participants[i].item0,
                item1: participants[i].item1,
                item2: participants[i].item2,
                item3: participants[i].item3,
                item4: participants[i].item4,
                item5: participants[i].item5,
                item6: participants[i].item6,}
      }
    }
}

const validateItems = (itemsObject) => {
  Object.keys(itemsObject).forEach(ref => {
    if (itemsObject[ref] === 0) {
      itemsObject[ref] = itemIdPlaceholder
    }
  });
}

const getKillsFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return participants[i].kills
      }
    }
}

const getDeathsFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return participants[i].deaths;
      }
    }
}

const getAssistsFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return participants[i].assists;
      }
    }
}

const getCreepScoreFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return participants[i].neutralMinionsKilled + participants[i].totalMinionsKilled
      }
    }
}

const getGoldEarnedFromMatchInfo = (matchObject) => {
  const participants = matchObject.info.participants;
    for (let i = 0; i < participants.length; i++) {
      if(participants[i].puuid == puuid) {
        return participants[i].goldEarned
      }
    }
}

const getGameDurationFromMatchInfo = (matchObject) => {
  const duration = matchObject.info.gameDuration;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration % 3600 / 60);
  const seconds = Math.floor(duration % 3600 % 60);
  var result = "";
  if(hours > 0)
    result += hours + ":";

  if(minutes > 0 && minutes < 10)
    result += "0" + minutes + ":";
  else if(minutes >= 10)
    result += minutes + ":";
  else
    result += "0:";

  if(seconds > 0 && seconds < 10)
    result += "0" + seconds;
  else if(seconds > 10)
    result += seconds;
  else
    result += "00";

  return result;
}

const getGameDateFromMatchInfo = (matchObject) => {
  const timestamp = matchObject.info.gameCreation;
  let date = new Date(timestamp);
  const month = date.getMonth(timestamp) + 1;
  const day = date.getDate(timestamp)
  const year = date.getFullYear(timestamp)
  return(`${month}/${day}/${year}`);
}
  
const handleSummoner = event => {
  setSummonerName(event.target.value);
}

const handleRegion = event => {
  setRegion(event.target.value);
}

  return (
    <div className="App">
      <img src={Logo} id="logo" />
      <SearchBar 
        Summoner={() => handleSummoner}
        Region={() => handleRegion}
        Puuid={() => searchSummoner}
      />

      <div className="summoner-container">
      {summonerComponent}
      </div>

      <div className="games-container">
       {gameElements}
      </div>
      <Footer/>
    </div>
  );

}

export default App;


