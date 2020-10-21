import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Profile from "./Profile";
import { getProfileUser } from "../../redux/actions/actions";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.id;
    if (!userId) {
      userId = 11992;
    }
    this.props.getProfileUser(userId);
  }

  render() {
    return (
      <>
        <Profile {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.userProfile,
  };
};

const composition = compose(
  connect(mapStateToProps, { getProfileUser }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

export default composition;
