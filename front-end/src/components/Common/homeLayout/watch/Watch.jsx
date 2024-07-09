import React, { useState, useEffect } from "react";
import "react-clock/dist/Clock.css";
import "./watch.css";

const Watch = () => {
  const [hourDeg, setHourDeg] = useState(0);
  const [minDeg, setMinDeg] = useState(0);
  const [secDeg, setSecDeg] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    updateTime(); 

    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    const secToDeg = (seconds / 60) * 360;
    const minToDeg = (minutes / 60) * 360;
    const hrToDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    setHourDeg(hrToDeg);
    setMinDeg(minToDeg);
    setSecDeg(secToDeg);


    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  };

  return (
    <div className="container">
      <div className="clock">
        {Array.from({ length: 12 }).map((_, index) => (
          <label key={index} style={{ "--i": index + 1 }}>
            <span>{index + 1}</span>
          </label>
        ))}
        <div className="indicator">
          <span className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }}></span>
          <span className="hand minute" style={{ transform: `rotate(${minDeg}deg)` }}></span>
          <span className="hand second" style={{ transform: `rotate(${secDeg}deg)` }}></span>
        </div>
      </div>
      <div className="date">{currentDate}</div>
    </div>
  );
};

export default Watch;
