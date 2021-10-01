import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBarForm from '../StockSearch/SearchBarForm';
import Dropdown from './Dropdown';
import styles from './NavBar.module.css'

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
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className={styles.nav}>
        <div className={styles.nav2}>
          <NavLink className="HomepageNavIcon" to='/portfolio' exact={true} activeClassName='active'>
            LEVERAGE
          </NavLink>
          <SearchBarForm />
          <div className={styles.nav3}>
            <div className={styles.navpadding}>
              <a className={styles.textdecoration} href='https://github.com/JackyxCS' target="_blank" rel="noreferrer">Github</a>
            </div>
            <div className={styles.navpadding}>
              <a className={styles.textdecoration} href='https://www.linkedin.com/in/liujiehao' target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className={styles.navpadding}>
              <NavLink className={styles.textdecoration} to='/portfolio'>
                Portfolio
              </NavLink>
            </div>
            <div className={styles.navpadding}>
              <NavLink className={styles.textdecoration} to='/social'>
                Social
              </NavLink>
            </div>
            {/* <LogoutButton /> */}
            <Dropdown />
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
