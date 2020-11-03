import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewPost } from "../../../redux/actions/actions";
import MyPosts from "./MyPosts";

class MyPostsContainer extends Component {
  render() {
    let { posts, createNewPost } = this.props;
    return (
      <>
        <MyPosts posts={posts} createNewPost={createNewPost} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  let { posts } = state.profilePage;
  return {
    posts: posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPost: (newPostText) => {
      dispatch(createNewPost(newPostText));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer);
