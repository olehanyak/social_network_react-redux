import React from "react";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

const Users = ({ totalPages, sizePage, users, followingProgress, currentPage, onSelectedPage, follow, unfollow }) => {
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
