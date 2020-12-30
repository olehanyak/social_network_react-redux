import React from "react";
import { UsersType } from "../../types/types";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

type PropsType = {
  totalPages: number
  sizePage: number
  users: Array<UsersType>
  followingProgress: Array<number>
  currentPage: number
  onSelectedPage: (page: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({ totalPages, sizePage, users, followingProgress, currentPage, onSelectedPage, follow, unfollow }) => {
  return (
    <>
      <Pagination
        totalPages={totalPages}
        sizePage={sizePage}
        currentPage={currentPage}
        onSelectedPage={onSelectedPage}
      />
      <div>
        {users.map((user) => (
          <User user={user} followingProgress={followingProgress} follow={follow} unfollow={unfollow} key={user.id} />
        ))}
      </div>
    </>
  );
};

export default Users;
