import Segments from "./Segments";
import { useState, useEffect } from 'react'

function Colors() {

  const [colors, setColors] = useState([255,255,255]);
  const [showArt, setShowArt] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors(() => {
        const base = Math.floor(Math.random() * 3);
        let temp = [];
        temp[base] = 255;
        for (let i = 0; i < 3; i++) {
          if (base != i) {
            temp[i] = Math.floor(Math.random() * 255);
          }
        }
        return [temp[0],temp[1],temp[2]];
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setShowArt(!showArt);
  }

  return (
    <>
      <div className="section-full">
        <div className="container">
          {showArt ? <Segments value={Math.floor(Math.random() * 9999)} colors={colors}/> : 
          <button 
            className="button-outline"
            onClick={handleClick}
          >See examples [warning: flashing colors]</button>}
        </div>
      </div>
    </>
  )

}

export default Colors;