import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Nav = () => {
  return (
    <div className = "navbar">
      <img src='https://iconape.com/wp-content/files/zs/12498/png/dumpster-fire.png' id="icon" />
      <FontAwesomeIcon icon="fa-solid fa-dumpster-fire" />
      <ul>
        <li><Link to="/market">Market</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/">Sign Out</Link></li>
      </ul>
    </div>
  )
};

export default Nav;