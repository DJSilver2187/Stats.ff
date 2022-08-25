import React from 'react';
import Participant from './Participant'
import "./styles.css"

let participantElements = [];

export default function Team(props) {

    let summonerSpellMap= props.summonerSpellMap

    for(let i = 0; i < props.participants.length; i++)
    {
        participantElements[i] = 
            <Participant
                summonerName={props.participants[i].summonerName}

                summonerSpell1={
                    summonerSpellMap.get(props.participants[i].summoner1Id) > 10000? "Summoner_UltBookPlaceholder.png" :
                    summonerSpellMap.get(props.participants[i].summoner1Id)}
                summonerSpell2={
                    summonerSpellMap.get(props.participants[i].summoner2Id) > 10000? "Summoner_UltBookPlaceholder.png" :
                    summonerSpellMap.get(props.participants[i].summoner2Id)}

                champion={props.participants[i].championName}
                level={props.participants[i].champLevel}

                item0={props.participants[i].item0}
                item1={props.participants[i].item1}
                item2={props.participants[i].item2}
                item3={props.participants[i].item3}
                item4={props.participants[i].item4}
                item5={props.participants[i].item5}
                item6={props.participants[i].item6}

                kills={props.participants[i].kills}
                deaths={props.participants[i].deaths}
                assists={props.participants[i].assists}

                cs={props.participants[i].neutralMinionsKilled + props.participants[i].totalMinionsKilled}
                gold={props.participants[i].goldEarned}

                currentSummoner={props.currentSummoner}

                searchSummoner={props.searchSummoner}
                setSummonerName={props.setSummonerName}
            />
    }

    return (
    <div className="team-container"
    style={{backgroundColor: props.victory ? 'rgba(5,90,140, .4)' : 'rgba(211,29,12, 0.3)' }}>

        {participantElements}

    </div>
    )
}