import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Users.module.css";
import { unFollowUsers } from "../../redux/actions/actions";
import { followUsers } from "../../redux/actions/actions";
import ReactPaginate from "react-paginate";

const Users = (props) => {
  let countPage = Math.ceil(props.totalPages / props.sizePage);
  console.log(countPage);
  let pages = [];
  for (let i = 1; i <= countPage; i++) {
    pages.push(i);
  }
  console.log(pages);

  return (
    <>
      {pages.map((page, index) => {
        return (
          <div className={styles.listOfPages}>
            <span
              key={index}
              onClick={() => {
                props.onSelectedPage(page);
              }}
              className={props.currentPage === page ? styles.selectedPage : ""}
            >
              {page}
            </span>
          </div>
        );
      })}
      {props.users.map((user) => (
        <div key={user.id} className={styles.container}>
          <span className={styles.imgBlock}>
            <div>
              <NavLink to={"/profile/" + user.id}>
                <img className={styles.photoUrl} src={user.photos.large} alt="Avatar" />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  disabled={props.followingProgress.some((id) => id === user.id)}
                  className={styles.btnFollower}
                  onClick={() => {
                    unFollowUsers(user);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingProgress.some((id) => id === user.id)}
                  className={styles.btnFollower}
                  onClick={() => {
                    followUsers(user);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <div className={styles.userBlock}>
              <div>
                {user.name}
                <p className={styles.status}>{user.status}</p>
              </div>
              <div className={styles.location}>
                {user.location}
                {/* <p className={styles.country}>{user.location.country}</p> */}
              </div>
            </div>
          </span>
        </div>
      ))}
    </>
  );
};

export default Users;
