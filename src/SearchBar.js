import React, { useEffect, useState } from 'react';
import "./styles.css";
import SearchIcon from "./pictures/SearchIcon.png"

let name = "";

export default function SearchBar(props) {

    return (
        <div className="input-container">


         <span id="region-container">
         <label>Region</label> <br/>
          <select onChange={props.Region()} id="region-selector">
           <option className="region-option" value="americas">
             Americas
           </option>
           <option className="region-option" value="asia">
             Asia
           </option>
           <option className="region-option" value="europe">
             Europe
           </option>
           <option className="region-option" value="sea">
             Sea
           </option>
          </select>
         </span>

         <span id="summoner-container">
          <label>Name</label> <br/>
         <input onChange={event => {name = event.target.value}} 
         type="Textbox" placeholder="Summoner Name"/>
        </span>


        <button onClick={() => props.searchSummoner(name)} id="search-bar-submit" >
         <img id="search-bar-image" src={SearchIcon}></img>
        </button>
        <br/><br/>
       </div>
    );
}