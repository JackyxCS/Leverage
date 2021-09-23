import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import TransferForm from './components/TransferForm';
import BuyStockForm from './components/BuyStockForm';
import StockPageGraph from './components/StockPageGraph';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <h1>Home page placeholder</h1>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>


        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/profile' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/transfers'>
          <h1>Transfers</h1>
          <TransferForm />
        </ProtectedRoute>
        <ProtectedRoute path='/portfolio' exact={true} >
          <h1>Portfolio Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/stocks/:stockticker' exact={true} >
          <h1>this is a ticker</h1>
          <h1>Buy form here</h1>
          <BuyStockForm />
          <StockPageGraph />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
