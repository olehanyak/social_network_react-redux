import React, { useEffect } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./components/Settings/Settings";
import { DialogsPage } from "./components/Dialogs/DialogsPage";
import { UsersPage } from "./components/Users/UsersPage";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { LoginPage } from "./components/Login/LoginPage";
import { initializing } from "./redux/reducers/appReducer";
import Preloader from "./components/Preloader/Preloader";
import NotFound from "./components/NotFound/NotFound";
import { AppStateType } from "./redux/redux_store";

const Music = React.lazy(() => import("./components/Music/Music"));
const News = React.lazy(() => import("./components/News/News"));

type PropsType = {
  initializing(): void
  initializedApp: boolean
}

const App: React.FC<PropsType> = (props) => {
  // componentDidMount() {
  //   this.props.initializing();
  // }

  useEffect(() => {
    props.initializing();
  })

  if (!props.initializedApp) {
    return <Preloader />;
  }
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Switch>
          <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
          <Route path="/dialogs" render={() => <DialogsPage />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/users" render={() => <UsersPage />} />
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
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="*" render={() => <NotFound />} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initializedApp: state.app.initializedApp,
  };
};

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializing }))(App);
