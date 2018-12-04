var React = require('react');
var NavBar = require('./NavBar');
var MainSearch = require('./MainSearch');

class MainScreen extends React.Component {

  render() {
    return (
      <div className='flex-column full-height'>
        <NavBar />
        <MainSearch />
      </div>
    )
  }
}

module.exports = MainScreen;
