import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Profile from "./Profile";
import { getProfileUser, getProfileStatus, updateProfileStatus } from "../../redux/reducers/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
class ProfileContainer extends Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    console.log(this.props);

    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfileUser(userId);
    this.props.getProfileStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <>
        <Profile
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateProfileStatus}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.userProfile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
  };
};

const composition = compose(
  connect(mapStateToProps, { getProfileUser, getProfileStatus, updateProfileStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

export default composition;
