import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  if (!user) {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/signup' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          {/* <li>
            <LogoutButton />
          </li> */}
        </ul>
      </nav>
    )
  } else {
    return (
      <nav>
        <h1>Hi User</h1>
        <LogoutButton />
      </nav>
    )
  }
}

export default NavBar;
