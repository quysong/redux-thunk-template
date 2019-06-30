import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
import PublicPage from './screens/PublicPage/PublicPage';
import ProtectedPage from './screens/ProtectedPage/ProtectedPage';
import PageNotFound from './screens/PageNotFound';
import ListEmployee from './screens/ListEmployee/ListEmployee';
import { translate, Trans } from "react-i18next";
import ChangeLanguage from "./components/changeLanguage";

function App() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/employee">Employee</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={PublicPage} />
          <Route path="/public" component={PublicPage} />
          <Route path="/employee" component={ListEmployee} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={ProtectedPage} />
          <Route component={PageNotFound} />
        </Switch>
        <hr></hr>
        Multilang
        <h2 style={{ whiteSpace: "pre-line" }}>
          <Trans i18nKey="multiLine" />
        </h2>
        <ChangeLanguage />
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
        <p>You are not logged in.</p>
      )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class Login extends Component {
  state = { redirectToReferrer: false };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

// export default App;
export default translate("translations")(App);
