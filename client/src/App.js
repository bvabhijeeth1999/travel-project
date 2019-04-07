import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import BookT from "./components/BookT";
import SeatB from "./components/SeatB";
import BusList from "./components/BusList";

import { Provider } from 'react-redux';
import store from './store';
import {Container} from 'reactstrap';
import Signup from "./components/Signup";

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className="App">
        <BrowserRouter>
          <NavBar />
          <Container>
          <Route exact path="https://easygo-t22.herokuapp.com/login/" component={Login} />
          <Route exact path="https://easygo-t22.herokuapp.com/" component={Home} />
          <Route exact path="https://easygo-t22.herokuapp.com/book_tickets/" component={BookT} />
          <Route exact path="https://easygo-t22.herokuapp.com/book_tickets/seats_booking/" component={SeatB} />
          <Route exact path="https://easygo-t22.herokuapp.com/book_tickets/bus_list/" component={BusList} />
          <Route exact path="https://easygo-t22.herokuapp.com/signup/" component={Signup} />
          </Container>
        </BrowserRouter>
      </div>
      </Provider>

    );
  }
}

export default App;
