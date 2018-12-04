var React = require('react');
var PropTypes = require('prop-types');

function CurrentWeather (props) {
  return (
    <div className='flex-column current-weather-container align-center'>
      <h2>{props.formattedName}</h2>
      <h3>Current Weather</h3>
      <div className='flex-row align-justify-center full-width'>
        <img src={props.weatherImage} alt='Current Weather Icon'/>
        <p>{props.description}<br/>
           Temperature: {props.temperature}&#176;<br/>
           Feels Like: {props.feelsLike}&#176;<br />
           Humidity: {props.humidity}<br/>
           Wind Speed: {props.windSpeed}mph</p>
      </div>
    </div>
  )
}

CurrentWeather.propTypes = {
  formattedName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  feelsLike: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  windSpeed: PropTypes.string.isRequired
}

module.exports = CurrentWeather;
