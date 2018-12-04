var React = require('react');
var SearchBar = require('./SearchBar');
var weatherImage = require('../images/weather.png');

class MainSearch extends React.Component {

  render() {
    return (
      <div className='home-container flex-shrink-0' style={{backgroundImage: "url('" + weatherImage + "')"}}>
        <h2>Enter a City & State</h2>
        <SearchBar flexClass={'flex-direction-column'} />
      </div>
    )
  }
}

module.exports = MainSearch;
