import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/authReducer";
import Login from "./Login";

const LoginContainer = (props) => {
  return (
    <div>
      <Login login={props.login} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { login })(LoginContainer);
