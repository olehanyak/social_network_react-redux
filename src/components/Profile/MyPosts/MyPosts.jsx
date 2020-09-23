import React from "react";
import { updateNewText } from "../../../redux/actions/actions";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postElement = props.posts.map((data) => <Post key={data.id} message={data.message} like={data.like} />);

  let onAddPost = () => {
    props.createNewPost();
  };

  let onChangeNewText = (e) => {
    let newText = e.target.value;
    props.updateNewText(newText);
  };

  return (
    <div className={styles.posts}>
      <h3>My posts</h3>
      <div className={styles.formBlock}>
        <div>
          {" "}
          <textarea
            className={styles.textArea}
            onChange={onChangeNewText}
            placeholder="Write a new post"
            value={props.newPostText}
          />
        </div>
        <div>
          {" "}
          <button onClick={onAddPost} className={styles.btn}>
            Add post
          </button>
        </div>
      </div>
      <div className={styles.block}>{postElement}</div>
    </div>
  );
};

export default MyPosts;
