import { api } from "../api/api";
import { IBoard, ITask } from "../types/types";

const boardsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<{ data: IBoard[] }, void>({
      query: () => "boards",
    }),
    getTasksFromBoard: build.query<{ data: ITask[] }, string>({
      query: (boardId) => `boards/${boardId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetBoardsQuery, useGetTasksFromBoardQuery } = boardsApi;
