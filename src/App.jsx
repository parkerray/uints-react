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
    if (amount == 0) {
      setCount(0);
    } else if (count + amount <= 9999) {
      setCount(count + amount);
    }
  }

  return (
    <div className="App">
      <div className="section">
        <div className='container'>
          <Number value={count} />
          <Button text="+1" onClick={() => handleClick(1)} />
          <Button text="+10" onClick={() => handleClick(10)} />
          <Button text="+100" onClick={() => handleClick(100)} />
          <Button text="+1,000" onClick={() => handleClick(1000)} />
          <Button text="Reset" onClick={() => handleClick(0)} />
        </div>
      </div>
    </div>
  )
}

export default App
