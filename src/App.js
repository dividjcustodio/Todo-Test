import React from "react";
import {  connect } from "react-redux";

import { BrowserRouter as Router,  Switch } from "react-router-dom";

import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";
import SignInPage from "./pages/SignInPage";

import PublicRoute from "./components/Routes/PublicRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";

import { logout } from "./actions/user";
import "./App.css";

function App(props) {
  React.useEffect(() => {}, [props.user.isAuthenticated]);
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          isAuthenticated={props.user.isAuthenticated}
          component={ListPage}
        />
        <PrivateRoute
          path="/detail/:id"
          isAuthenticated={props.user.isAuthenticated}
          component={DetailPage}
        />
        <PublicRoute
          exact
          path="/login"
          isAuthenticated={props.user.isAuthenticated}
          component={SignInPage}
        />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout })(App);
