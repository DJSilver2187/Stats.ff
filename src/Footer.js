import React, { useEffect, useState } from 'react';
import "./styles.css";
import Twitter from "./pictures/social-media-icons/TwitterIcon.png"
import Facebook from "./pictures/social-media-icons/FacebookIcon.png"
import Github from "./pictures/social-media-icons/GithubIcon.png"
import Instagram from "./pictures/social-media-icons/InstagramIcon.png"
import Linkedin from "./pictures/social-media-icons/LinkedinIcon.png"

export default function Footer() {
    return (
        <div id="footer-container">
         <hr/>
         <div id="footer-text">
         This application is not endorsed by Riot Games and does not reflect the 
         views or opinions of Riot Games or anyone officially involved in producing
         or managing League of Legends. League of Legends and Riot Games are 
         trademarks or registered trademarks of Riot Games, Inc. League of Legends
         &copy; Riot Games, Inc.
         </div>
         <div id="social-media-links">
          <a href="https://twitter.com/ButterThyToast"
             target="_blank">
           <img id="twitter-icon" src={Twitter}/>
          </a>

          <a href="https://www.facebook.com/daxston.silver/"
             target="_blank">
           <img id="facebook-icon" src={Facebook}/>
          </a>

          <a href="https://instagram.com/ButterThyToast"
             target="_blank">
           <img id="instagram-icon" src={Instagram}/>
          </a>

          <a href="https://www.linkedin.com/in/daxston-silver-642927204/"
             target="_blank">
           <img id="linkedin-icon" src={Linkedin}/>
          </a>

          <a href="https://github.com/DJSilver2187"
             target="_blank">
           <img id="github-icon" src={Github}/>
          </a>

         </div>
        </div>
    )
}