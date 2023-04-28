import React from 'react'
import "./Home.css"
import image from "../../assets/Gaming.gif"
import NavBar from './components/navBar/NavBar'



export const Home = () => {
  return (
    <div className="main">
      <NavBar/>
      <div className="mainHome">
        <div className="text">
          <p>Code kid a Fun and Interactive Coding Experience for kids</p>
        </div>
        <div className="image">
          <img src={image} alt="image" />
        </div>
      </div>
    </div>
  )
}
