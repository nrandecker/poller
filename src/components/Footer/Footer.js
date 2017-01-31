import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
      <footer className='footer'>
        <p>Built with React, Redux, and <span className='love'>❤ </span>
        by <a href='https://nrandecker.github.io'>Nathan Randecker</a></p>
      </footer>
    );
  }
}

export default Footer;
