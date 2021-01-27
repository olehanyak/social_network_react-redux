import React, { useEffect } from "react";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";
import SearchUsersForm from "./SearchUsersForm";
import { actions, FilterType, requestUsers } from "../../redux/reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, totalPagesSelector, sizePageSelector, followingProgressSelector, currentPageSelector, filterSelector } from "../../redux/selectors/userSelector";
import { useHistory, useLocation } from "react-router-dom";

type PropsType = {}

export const Users: React.FC<PropsType> = React.memo((props) => {

  const users = useSelector(userSelector);
  const totalPages = useSelector(totalPagesSelector);
  const sizePage = useSelector(sizePageSelector);
  const followingProgress = useSelector(followingProgressSelector);
  const currentPage = useSelector(currentPageSelector);
  const filter = useSelector(filterSelector);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  console.log(history);
  console.log(location);
  

  useEffect(() => {
    dispatch(requestUsers(currentPage, sizePage, filter));
  }, [])

  const onSelectedPage = (page: number) => {
    dispatch(requestUsers(page, sizePage, filter));
  };

  const onFilterChange = (filter: FilterType) => {
    dispatch(requestUsers(1, sizePage, filter));
  };

  const follow = (userId: number): void => {
    dispatch(actions.follow(userId));
  };

  const unFollow = (userId: number): void => {
    dispatch(actions.unFollow(userId));
  };

  return (
    <>
      <SearchUsersForm onFilterChange={onFilterChange} />
      <Pagination
        totalPages={totalPages}
        sizePage={sizePage}
        currentPage={currentPage}
        onSelectedPage={onSelectedPage}
      />
      <div>
        {users.map((user) => (
          <User user={user} followingProgress={followingProgress} follow={follow} unFollow={unFollow} key={user.id} />
        ))}
      </div>
    </>
  );
});
