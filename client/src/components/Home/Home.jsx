import React, { useEffect, useState } from 'react';
import './Home.css';
import introImage from '../../assets/Gaming.gif';
import NavBar from '../Elements/navbar/NavBar';

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const res = await (
        await fetch('https://api.kidscode.com/auth/login')
      ).json();

      // set state when the data received
      setData(res);
    };

    dataFetch();
  }, []);

  console.log(data);
  return (
    <div className="main">
      <NavBar />
      <div className="mainHome">
        <div className="text">
          <p>Code kid a Fun and Interactive Coding Experience for kids</p>
        </div>
        <div className="image">
          <img src={introImage} alt="imageintro" />
        </div>
      </div>
    </div>
  );
}

export default Home;
