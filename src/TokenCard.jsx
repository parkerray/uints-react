export default function TokenCard({image, label, color = '#ffffff33'}) {
  return (
    <div className="token-card">
      <img src={image} className='token-image' style={{border: `${color} 1px solid`}} />
      <p className="token-label">{label}</p>
    </div>
  )
}