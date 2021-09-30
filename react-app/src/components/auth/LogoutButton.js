import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styles from './LogoutButton.module.css';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button className={styles.textdecoration} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
