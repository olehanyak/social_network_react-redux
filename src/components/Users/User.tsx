import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Users.module.css";
import { unFollowUsers, followUsers } from "../../redux/reducers/usersReducer";
import { templatePhoto } from "../Profile/ProfileInfo/ProfileInfo";
import { UsersType } from "../../types/types";

type PropsType = {
  user: UsersType
  followingProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({ user, followingProgress, follow, unfollow }) => {

  const chooseUserPhoto = user.photos.small !== null ? user.photos.large : templatePhoto

  return (
    <>
      <div key={user.id} className={styles.container}>
        <span className={styles.userBlock}>
          <div>
            <NavLink to={"profile/" + user.id}>
              <img
                className={styles.photoUrl}
                // src={user.photos.small !== null ? user.photos.large : templatePhoto}
                src={chooseUserPhoto}
                alt="Avatar"
              />
            </NavLink>
          </div>
          <div>
            {user.followed ? (
              <button
                disabled={followingProgress.some((id) => id === user.id)}
                className={styles.btnFollower}
                onClick={() => {
                  unFollowUsers(user.id);
                  // unfollow(user.id)
                }}
              >
                Unfollow
              </button>
            ) : (
                <button
                  disabled={followingProgress.some((id) => id === user.id)}
                  className={styles.btnFollower}
                  onClick={() => {
                    followUsers(user.id);
                    // follow(user.id)
                  }}
                >
                  Follow
                </button>
              )}
          </div>
        </span>
        <span>
          <div className={styles.userInfo}>
            <div>
              {user.name}
              <p className={styles.status}>{user.status}</p>
            </div>
            {/* <div className={styles.location}>{user.location}</div> */}
          </div>
        </span>
      </div>
    </>
  );
};

export default User;
