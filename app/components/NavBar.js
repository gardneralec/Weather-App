var React = require('react');

class NavBar extends React.Component {

  render() {
    return (
      <div className='nav-bar-container'>
        <h1>Weather App</h1>
        <div className='search-container' style={{flexDirection: 'row'}}>
          <input type='text' placeholder='San Antonio, Texas' className='form-control' />
          <button type='button' className='btn search-button'>Get Weather</button>
        </div>
      </div>
    )
  }

}

module.exports = NavBar;
