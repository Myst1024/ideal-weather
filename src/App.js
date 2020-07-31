import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Preferences from "./components/preferences/Preferences";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [userTemperature, setUserTemperature] = useState([60, 85]);
  const [userHumidity, setUserHumidity] = useState([0, 80]);
  const [userWind, setUserWind] = useState([0, 18]);
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Preferences
          userTemperature={userTemperature}
          setUserTemperature={setUserTemperature}
          userHumidity={userHumidity}
          setUserHumidity={setUserHumidity}
          userWind={userWind}
          setUserWind={setUserWind}
        />
        <Forecast />
      </div>
    </div>
  );
}

export default App;
