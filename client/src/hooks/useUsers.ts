import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useGetUsersQuery } from "../state/users.rtk";
import { setUsersFromServer, selectUsers } from "../state/usersSlice";

export function useUsers() {
  const dispatch = useAppDispatch();
  const { data: usersFromServer } = useGetUsersQuery();

  useEffect(() => {
    if (usersFromServer) {
      dispatch(setUsersFromServer(usersFromServer.data));
    }
  }, [usersFromServer, dispatch]);

  const users = useAppSelector(selectUsers);
  return users;
}
