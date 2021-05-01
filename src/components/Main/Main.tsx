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

function Main() {
  return (
    <>
      <Header />
      <AntLayout>
        <Router>
          <Switch>
            <Route exact path="/">
              <Signup />
            </Route>
            <Route exact path="/oauth">
              <Oauth />
            </Route>
            <PrivateRoute exact path="/documents/new">
              <div>new doc</div>
            </PrivateRoute>
            <PrivateRoute exact path="/documents">
              <DocumentList />
            </PrivateRoute>
            <FallbackRoute />
          </Switch>
        </Router>
      </AntLayout>
      <Footer />
    </>
  );
}

export default Main;
