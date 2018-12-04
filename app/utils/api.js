var axios = require('axios');

var _googleMapsApiKey = 'AIzaSyCRQx5noDNy40L0-wSTeSRD5OaCo65rUY4';
var _baseGoogleMapsURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var _darkSkyApiKey = '799f2db18c2911f80b6bec14811aac6b';
var _darkSkyBaseURL = 'https://api.darksky.net/forecast/';
var _yqlBaseURL = 'https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20json%20where%20url%3D';
var _yqlEndCapURL = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';


function getLocationCoords (cityName) {
  var locationURL = _baseGoogleMapsURL + encodeURIComponent(cityName) + '&key=' + _googleMapsApiKey;
  return axios.get(locationURL).then(function(result) {
    return result.data;
  })
}

function getWeatherData (lat, lng) {
  var weatherURL = _yqlBaseURL + "'" + _darkSkyBaseURL + _darkSkyApiKey + '/' + lat + ',' + lng + "'" + _yqlEndCapURL;

  return axios.get(weatherURL).then(function(result) {
    return result.data.query.results.json;
  })
}

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {

  getWeather: function(cityName) {
    return getLocationCoords(cityName).then(function(result) {

      var formattedName = null;
      var lat = null;
      var lng = null;

      if(result.results.length != 0) {
        formattedName = result.results[0].formatted_address;
        lat = result.results[0].geometry.location.lat;
        lng = result.results[0].geometry.location.lng;
      } else {
        return null;
      }

      return getWeatherData(lat, lng).then(function(result) {

        return {
          weatherData: result,
          formattedName: formattedName
        }
      }).catch(handleError)
    }).catch(handleError)
  }
};
