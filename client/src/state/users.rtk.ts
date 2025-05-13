import { api } from "../api/api";
import { IUser } from "../types/types";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<{ data: IUser[] }, void>({
      query: () => "users",
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = usersApi;
