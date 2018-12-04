var React = require('react');
var SearchBar = require('./SearchBar');
var Link = require('react-router-dom').Link;

class NavBar extends React.Component {

  render() {
    return (
      <div className='nav-bar-container'>
        <Link className='app-title' to={{pathname: '/'}}>Simply Weather</Link>
        <SearchBar flexClass='flex-direction-row' />
      </div>
    )
  }

}

module.exports = NavBar;
