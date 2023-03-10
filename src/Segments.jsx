import { renderSvg } from '../numberGenerator.js'

function Segments({value,colors = [255,255,255]}) {

  if (value != undefined) {
    const image = renderSvg(value,colors);
    const buff = new Buffer(image);
    const base64data = buff.toString('base64');
    const b64 = `data:image/svg+xml;base64,${base64data}`

    return (
      // <div className='numberWrapper' dangerouslySetInnerHTML={{__html: renderSvg(value)}} />
      <img draggable='false' className='counter' src={b64}></img>
    );
  } else {
    return <img></img>
  }

}

export default Segments;