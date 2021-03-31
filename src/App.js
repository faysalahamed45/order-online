import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Shop from '../src/components/shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/Not Found/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LogIn from './components/LogIn/LogIn';


export const userCreate = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userCreate.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <h3>email: {loggedInUser.email}</h3> */}
      <Router>
        <Switch>
          <Route path="/Shop">
            <Shop></Shop>
          </Route>
          <Route path="/order">
            <Review></Review>
          </Route>
          <Route path="/manage">
            <Inventory></Inventory>
          </Route>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userCreate.Provider>


  );
}

export default App;
