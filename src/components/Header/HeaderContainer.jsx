import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import styles from "./Header.module.css";
import { authUserLogin } from "../../redux/actions/actions";
// import { dataAPI } from "../../API/api";

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.authUserLogin();
    // dataAPI.authUser().then((data) => {
    //   if (data.resultCode === 0) {
    //     let { id, email, login } = data.data;
    //     this.props.setAuthUserData(id, email, login);
    //   }
    // });
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
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
