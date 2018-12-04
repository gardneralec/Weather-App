var React = require('react');
var NavBar = require('./NavBar');
var queryString = require('query-string');
var api = require('../utils/api');
var CurrentWeather = require('./CurrentWeather');
var ForecastDay = require('./ForecastDay');
var Link = require('react-router-dom').Link;
var thunderstormImage = require('../images/thunder.svg');
var cloudyImage = require('../images/cloudy.svg');
var drizzleImage = require('../images/drizzle.svg');
var rainImage = require('../images/rain.svg');
var snowImage = require('../images/snow.svg');
var fogImage = require('../images/fog.svg');
var sunnyImage = require('../images/sunny.svg');


class Forecast extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formattedName: null,
      weatherData: null,
      error: null,
      loading: true
    }

    this.makeRequest = this.makeRequest.bind(this);
  }

  selectWeatherImage (iconName) {

    console.log(cloudyImage);

    switch(iconName) {
      case 'thunderstorm':
        return thunderstormImage;
        break;
      case 'sleet':
        return drizzleImage;
        break;
      case 'rain':
        return rainImage;
        break;
      case 'snow':
      case 'hail':
        return snowImage;
        break;
      case 'fog':
      case 'tornado':
        return fogImage;
        break;
      case 'clear-day':
      case 'clear-night':
        return sunnyImage;
        break;
      case 'cloudy':
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return cloudyImage;
        break;
      default:
        return sunnyImage;
    }
  }

  makeRequest (city) {
    this.setState(function() {
      return {
        loading: true
      }
    })

    api.getWeather(city)
    .then(function(res) {

      if(res === null) {
        this.setState(function() {
          return {
            error: 'An error has occured. Please check the city you entered and try again.',
            loading: false
          }
        })
      } else {
        this.setState(function() {
          return {
            error: null,
            loading: false,
            weatherData: res.weatherData,
            formattedName: res.formattedName
          }
        });
      }
    }.bind(this));
  }

  componentDidMount () {
    var city = queryString.parse(this.props.location.search).city;

    this.makeRequest(city);
  }

  componentWillReceiveProps (nextProps) {
    var city = queryString.parse(nextProps.location.search).city;

    this.makeRequest(city);
  }

  render() {

    var loading = this.state.loading;
    var error = this.state.error;
    var weatherData = this.state.weatherData;
    var formattedName = this.state.formattedName;

    if(loading === true) {
      return (
        <div className="flex-column full-height">
          <NavBar />
          <div className='flex-row align-justify-center full-height'>
            <h2 style={{textAlign: 'center'}}>Loading</h2>
          </div>
        </div>
      )
    }

    if(error != null) {
      return (
        <div className="flex-column full-height">
          <NavBar />
          <div className='flex-column align-justify-center full-height'>
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>{error}</h2>
            <Link type='button' className='btn search-button error-button' to={{pathname: '/'}}>Try Again</Link>
          </div>
        </div>
      )
    }

    return (
      <div className='flex-column full-height'>
        <NavBar />
        <div className='flex-column align-center justify-center flex-basis-auto flex-grow-2 flex-shrink-0 forecast'>
          <CurrentWeather
            formattedName={formattedName}
            weatherImage={this.selectWeatherImage(weatherData.currently.icon)}
            description={weatherData.currently.summary}
            temperature={weatherData.currently.temperature}
            feelsLike={weatherData.currently.apparentTemperature}
            humidity={weatherData.currently.humidity}
            windSpeed={weatherData.currently.windSpeed} />
          <div className='flex-row space-around flex-wrap forecast-days'>
            {[0,1,2,3,4,5].map(function(i) {
              return (
                <ForecastDay
                  epoch={weatherData.daily.data[i].time}
                  weatherImage={this.selectWeatherImage(weatherData.daily.data[i].icon)}
                  high={weatherData.daily.data[i].temperatureMax}
                  low={weatherData.daily.data[i].temperatureMin}
                  prec={weatherData.daily.data[i].precipProbability}
                  key={i} />
              );
            }, this)}
          </div>
        </div>
        <div className='flex-row justify-center'>
          <a href='https://darksky.net/poweredby/' className='powered-by'>Powered by Dark Sky</a>
        </div>
      </div>
    )
  }
}

module.exports = Forecast;
