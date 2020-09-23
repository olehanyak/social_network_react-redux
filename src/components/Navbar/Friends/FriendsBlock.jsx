import React from "react";
import styles from "../Friends/FriendsBlock.module.css";

const FriendsBlock = (props) => {
    return (
        <span className={styles.friendBox}>
            <img
                className={styles.avatar}
                src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                alt="avatar friend"
            />
            <div className={styles.nameFriend}>{props.friend}</div>
        </span>
    );
};

export default FriendsBlock;
