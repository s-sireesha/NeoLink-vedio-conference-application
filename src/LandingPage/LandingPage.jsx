import React from 'react';
import "./LandingPage.css";
import Navbar from '../Navbar/Navbar';
import img from "../Assets/landing-img.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
        <Navbar/>
        <div className="hero">
          <div className="left">
            <div className="heading">
              <h1>One tool for all your<br></br> <span>Virtual Conferences</span></h1>
            </div>
            <div className="para">
              <p>The is an-in one platform to host immersive events and build real connections, Online .</p>
            </div>
            <div className="button">
                <button>Get Started</button>
            </div>
          </div>
          <div className="right">
            <img src={img} alt="" />
          </div>
        </div>
    </div>
  )
}

export default LandingPage