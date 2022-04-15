import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="nav-wrapper blue-grey" style={{ padding: '0 3rem' }}>
        <span href="/" className="brand-logo">
          Shorten your link. Make life easier
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create Link</NavLink>
          </li>
          <li>
            <NavLink to="/links">Saved Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
