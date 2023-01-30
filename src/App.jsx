import './App.css'
import { renderSvg } from '../numberGenerator.js'
import { useState } from 'react';

function Number({value}) {
  return (
    <div dangerouslySetInnerHTML={{__html: renderSvg(value)}} />
  )
}

function Button({text,onClick}) {
  return (
    <button className="numberButton" onClick={onClick}>{text}</button>
  )
}

function App() {
  const [count, setCount] = useState(0);

  function handleClick(amount) {
    if (count + amount <= 9999) {
      setCount(count + amount);
    }
  }

  return (
    <div className="App">
      <div className="section">
        <div className='container flex'>
          <Number value={count} />
          <h1 className='heading'>Numbers are art</h1>
          <h2 className='sub'>and we are artists</h2>
          <div className="buttonWrapper">
            <Button text="+1" onClick={() => handleClick(1)} />
            <Button text="+10" onClick={() => handleClick(10)} />
            <Button text="+100" onClick={() => handleClick(100)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
