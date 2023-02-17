export default function TokenCard({image, label, color = '#ffffff33'}) {
  return (
    <div className="token-card">
      <img src={image} className='token-image' style={{border: `${color} 1px solid`}} draggable='false' />
      <p className="token-label" style={{color: color}}>{label}</p>
    </div>
  )
}