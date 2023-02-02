import './App.css'
import Segments from './Segments'
import { useState } from 'react';

function countUp() {
  let counter = 0;
  setInterval(() => {
  if (counter === 9999) {
    clearInterval();
    return;
  }
  counter++;
  renderSvg(counter.toString());
  }, 500);

}

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(Math.floor(Math.random() * 9999) + 1);
  }

  return (
    <>
      <div className='section-full'>
        <div className='container'>
          <Segments value={count} />
          <h1 className='hero-text'>Numbers are art</h1>
          <h2 className='hero-text-sub'>& we are artists</h2>
          <button className='button-outline' onClick={handleClick}>Paint a picture</button>
        </div>
      </div>
    </>
  )
}

export default App
