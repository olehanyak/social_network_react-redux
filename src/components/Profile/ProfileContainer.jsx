import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from "./Profile";
import { getProfileUser, getProfileStatus, updateProfileStatus } from "../../redux/actions/actions";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.id;
    console.log(this.props)
    if (!userId) {
      userId = 2;
    }
    this.props.getProfileUser(userId);
    this.props.getProfileStatus(userId);
  }

  render() {
    console.log(this.props.profile);
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
  };
};

const composition = compose(
  connect(mapStateToProps, { getProfileUser, getProfileStatus, updateProfileStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

export default composition;
