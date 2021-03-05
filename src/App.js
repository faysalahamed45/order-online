import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Shop from '../src/components/shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/Not Found/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <Router>
      <Header></Header>
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


  );
}

export default App;
