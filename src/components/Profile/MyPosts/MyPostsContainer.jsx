import React from "react";
import { connect } from "react-redux";
import { updateNewText, createNewPost } from "../../../redux/actions/actions";
import MyPosts from "./MyPosts";

const mapStateToProps = (state) => {
  let { posts, newPostText } = state.profilePage;
  return {
    posts: posts,
    newPostText: newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPost: () => {
      dispatch(createNewPost());
    },
    updateNewText: (text) => {
      let action = updateNewText(text);
      dispatch(action);
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
