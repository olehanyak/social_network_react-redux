import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import styles from "./Header.module.css";
import { logout } from "../../redux/reducers/authReducer";

class HeaderContainer extends Component {
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

export default connect(mapStateToProps, {logout})(HeaderContainer);
