import React, { useState } from "react";
import UserRegistration from "./components/UserRegistration";
import GreenLightRedLight from "./components/GreenLightRedLight";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);

  const handleStartGame = (data) => {
    setUserData(data);
  };

  return (
    <div className="app-container">
      <header className="header">Green Light/Red Light Game</header>
      {userData ? (
        <GreenLightRedLight difficulty={userData.difficulty} />
      ) : (
        <div className="main-content">
          <UserRegistration onStartGame={handleStartGame} />
        </div>
      )}
    </div>
  );
}

export default App;
