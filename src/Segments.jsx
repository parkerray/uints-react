import { renderSvg } from '../numberGenerator.js'

function Segments({value}) {

  const image = renderSvg(value);
  const buff = new Buffer(image);
  const base64data = buff.toString('base64');
  const b64 = `data:image/svg+xml;base64,${base64data}`

  return (
    // <div className='numberWrapper' dangerouslySetInnerHTML={{__html: renderSvg(value)}} />
    <img className='counter' src={b64}></img>
  );
}

export default Segments;