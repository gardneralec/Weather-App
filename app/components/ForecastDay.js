var React = require('react');
var PropTypes = require('prop-types');

function ForecastDay (props) {
  var date = new Date(props.epoch * 1000);
  var dateOptions = {month: 'short', day: 'numeric'};

  return (
    <div className='flex-column forecast-day-container align-justify-center'>
        <h4>{date.toLocaleDateString("en-US", dateOptions)}</h4>
        <img src={props.weatherImage} alt='Forecast Weather Icon'/>
        <p>High: {props.high}&#176;<br/>
           Low: {props.low}&#176;<br />
           Prec: {props.prec}</p>
    </div>
  )
}

ForecastDay.propTypes = {
  epoch: PropTypes.string.isRequired,
  high: PropTypes.string.isRequired,
  low: PropTypes.string.isRequired,
  prec: PropTypes.string.isRequired
}

module.exports = ForecastDay;
