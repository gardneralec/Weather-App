var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;


class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var value = event.target.value;

    this.setState(function () {
      return {
        city: value
      }
    })
  }


  render() {
    var match = this.props.match;
    var city = this.state.city;
    var flexClass = this.props.flexClass;

    return (
      <div className={'search-container ' + flexClass}>
        <input type='text' placeholder='San Antonio, Texas'
               autoComplete='off' className='form-control'
               value={city} onChange={this.handleChange} />
        <Link type='button' className='btn search-button' to={{pathname: '/forecast', search: '?city=' + city}}>Get Weather</Link>
      </div>
    )
  }
}

SearchBar.defaultProps = {
  flexClass: 'flex-direction-column'
}

SearchBar.propTypes = {
  flexClass: PropTypes.string.isRequired
}

module.exports = SearchBar;
