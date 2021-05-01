import React from "react";
import { Layout as AntLayout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../Header";
import DocumentList from "./DocumentList";
import Signup from "./Signup";
import Footer from "../Footer";
import PrivateRoute from "./PrivateRoute";
import FallbackRoute from "./FallbackRoute";
import Oauth from "./Oauth";
import CreateDocument from "./CreateDocument";

function Main() {
  return (
    <Router>
      <Header />
      <AntLayout>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route exact path="/oauth">
            <Oauth />
          </Route>
          <PrivateRoute exact path="/documents/new">
            <CreateDocument />
          </PrivateRoute>
          <PrivateRoute exact path="/documents">
            <DocumentList />
          </PrivateRoute>
          <FallbackRoute />
        </Switch>
      </AntLayout>
      <Footer />
    </Router>
  );
}

export default Main;
