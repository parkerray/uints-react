import Segments from "./Segments";
import { useState, useEffect } from "react";
import './Combine.css';

export function getMinutes() {

  const targetDate = new Date(Date.UTC(2023, 1, 18, 2, 0, 0, 0));
  const now = new Date(Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
    new Date().getUTCHours(),
    new Date().getUTCMinutes(),
    new Date().getUTCSeconds(),
    new Date().getUTCMilliseconds()
  ));
  const difference = targetDate.getTime() - now.getTime();
  const minutes = Math.floor(difference / (1000 * 60));
  return minutes >= 0 ? minutes : 0;
}

export function CombineClock() {
  const [minutesRemaining, setMinutesRemaining] = useState(getMinutes());

  const getRandomColors = () => {
    const base = Math.floor(Math.random() * 3);
    let temp = [];
    temp[base] = 255;
    for (let i = 0; i < 3; i++) {
      if (base != i) {
        temp[i] = Math.floor(Math.random() * 255);
      }
    }
    return [temp[0],temp[1],temp[2]];
  }

  const [colors, setColors] = useState(getRandomColors());

  useEffect(() => {
    const interval = setInterval(() => {
      setColors(getRandomColors());
      setMinutesRemaining(getMinutes());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (minutesRemaining === 0) {
      const loadTimer = setInterval(() => {
        window.location.reload();
      }, 20000);
  
      return () => clearInterval(loadTimer);
    }
  }, [minutesRemaining]);
  

  return (
    <div className='clock-wrapper'>
      <div className='clock-inner'>
        { minutesRemaining > 0
        ? <>
          <Segments value={minutesRemaining} colors={colors} />
          <a className='button-outline' href='/about/combining'>About combining</a>
        </>
        : <div className='spinner'><img src='/public/loading-ordered.svg' /></div>
        }
      </div>
    </div>
  )
}