import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import TextAreaReduxForm from "./TextAreaForPosts/TextAreaForPost";

const MyPosts = (props) => {
  let postElement = props.posts.map((data) => <Post key={data.id} message={data.message} like={data.like} />);

  const addNewPost = (value) => {
    console.log(value.newPost);
    props.createNewPost(value.newPost);
  };

  return (
    <div className={styles.posts}>
      <h3>My posts</h3>
      <TextAreaReduxForm
        onSubmit={addNewPost}
        newPostText={props.newPostText}
      />
      <div className={styles.block}>{postElement}</div>
    </div>
  );
};

export default MyPosts;
