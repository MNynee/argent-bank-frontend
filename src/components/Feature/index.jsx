import './feature.css'

const Feature = ({src, alt, title, description}) => {
  return (
    <div className="feature-item">
      <img src={src} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default Feature