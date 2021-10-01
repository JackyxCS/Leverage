import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import TransferForm from './components/Transfers/TransferForm';
import { getKey } from './store/key';
import SingleTransaction from './components/Social/SingleTransaction';
import Homepage from './components/Homepage/Homepage';
import HomepageNav from './components/Homepage/HomepageNav';
import LoginContainer from './components/auth/LoginContainer';
import SignupContainer from './components/auth/SignupContainer';
import PortfolioContainer from './components/PortfolioPage/PortfolioContainer';
import SingleStockPage from './components/StockDetails/SingleStockPage';
import SocialContainer from './components/Social/SocialContainer';
import UserProfile from './components/UserProfile/Profile';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getKey())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <HomepageNav />
          <Homepage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginContainer />
        </Route>
        <Route path='/signup' exact={true}>
          <SignupContainer />
        </Route>

        <ProtectedRoute path='/profile' exact={true} >
          <NavBar />
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/transfers'>
          <NavBar />
          <TransferForm />
        </ProtectedRoute>
        <ProtectedRoute path='/portfolio' exact={true} >
          <NavBar />
          <PortfolioContainer />
        </ProtectedRoute>
        <ProtectedRoute path='/stocks/:stockticker' exact={true} >
          <NavBar />
          <SingleStockPage />
        </ProtectedRoute>
        <ProtectedRoute path='/social' exact={true}>
          <NavBar />
          <SocialContainer />
        </ProtectedRoute>
        <ProtectedRoute path='/social/:transactionId' exact={true}>
          <NavBar />
          <SingleTransaction />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
