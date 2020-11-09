import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import styles from "./Header.module.css";
import { authUserLogin, logout } from "../../redux/reducers/authReducer";

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.authUserLogin();
  }

  render() {
    return (
      <div className={styles.header}>
        <Header {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

const mapDispatchToProps = {
  authUserLogin,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
