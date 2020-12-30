import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import { initializing } from "../src/redux/reducers/appReducer";
import Preloader from "./components/Preloader/Preloader";
import NotFound from "./components/NotFound/NotFound";

const Music = React.lazy(() => import("./components/Music/Music"));
const News = React.lazy(() => import("./components/News/News"));

class App extends Component {
  componentDidMount() {
    this.props.initializing();
  }
  render() {
    if (!this.props.initializedApp) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route
              path="/news"
              render={() => {
                return (
                  <React.Suspense fallback={<Preloader />}>
                    <News />
                  </React.Suspense>
                );
              }}
            />
            <Route
              path="/music"
              render={() => {
                return (
                  <React.Suspense fallback={<Preloader />}>
                    <Music />
                  </React.Suspense>
                );
              }}
            />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/login" render={() => <LoginContainer />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initializedApp: state.app.initializedApp,
  };
};

export default compose(withRouter, connect(mapStateToProps, { initializing }))(App);
