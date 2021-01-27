import React from "react";
import { useSelector } from "react-redux";
import { Users } from "./Users";
import Preloader from "../Preloader/Preloader";
import { isFetchingSelector } from "../../redux/selectors/userSelector";

export const UsersPage: React.FC = React.memo(() => {
  const isFetching = useSelector(isFetchingSelector);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
});