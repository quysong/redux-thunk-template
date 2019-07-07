import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
import PublicPage from './screens/PublicPage/PublicPage';
import ProtectedPage from './screens/ProtectedPage/ProtectedPage';
import PageNotFound from './screens/PageNotFound';
import ListEmployee from './screens/ListEmployee/ListEmployee';

import { translate } from 'react-i18next';
import MyAntDesign from './screens/MyAntDesign/antDesign';
import MyDevExtreme from './screens/MyDevExtreme/MyDevExtreme';

class App extends Component {
  render() {
    const { t, i18n } = this.props;
    return (
      <>
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
              <li>
                <Link to="/antd">Ant Design</Link>
              </li>
              <li>
                <Link to="/devextreme">Devextreme</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" exact component={PublicPage} />
              <Route path="/public" component={PublicPage} />
              <Route path="/employee" component={ListEmployee} />
              <Route path="/login" component={Login} />
              <Route path="/antd" component={MyAntDesign} />
              <Route path="/devextreme" component={MyDevExtreme} />
              <PrivateRoute path="/protected" component={ProtectedPage} />
              <Route component={PageNotFound} />
            </Switch>
            {/* <hr></hr>
            <div style={{ whiteSpace: "pre-line" }}>
              <button onClick={() => i18n.changeLanguage('vi')}>vi</button>
              <button onClick={() => i18n.changeLanguage('en')}>en</button>
              {t('welcome.title', { framework: "react-i18next" })}
              <br></br>
              {t('welcome.intro')}
            </div> */}

          </div>
        </Router>
      </>

    );
  }
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
export default translate('common')(App);
