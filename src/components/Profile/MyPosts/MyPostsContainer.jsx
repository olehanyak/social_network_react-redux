import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNewText, createNewPost } from "../../../redux/actions/actions";
import MyPosts from "./MyPosts";

class MyPostsContainer extends Component {
  render() {
    let { posts, newPostText, createNewPost, updateNewText } = this.props;
    return (
      <>
        <MyPosts posts={posts} newPostText={newPostText} createNewPost={createNewPost} updateNewText={updateNewText} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  let { posts, newPostText } = state.profilePage;
  return {
    posts: posts,
    newPostText: newPostText,
  };
};

const mapDispatchToProps = {
  createNewPost,
  updateNewText,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer);
