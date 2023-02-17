import Segments from "./Segments";
import { useState, useEffect } from "react";

export function getMinutes() {
  const targetDate = new Date(2023, 1, 17, 19, 0, 0, 0);
  const now = new Date();
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

  return (
    <div className='clock-wrapper'>
      <div className='clock-inner'>
        <Segments value={minutesRemaining} colors={colors} />
        <a className='button-outline' href='/about/combining'>About combining</a>
      </div>
    </div>
  )
}