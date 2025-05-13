import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useGetBoardsQuery } from "../state/boards.rtk";
import { setBoardsFromServer, selectBoards } from "../state/boardsSlice";

export function useBoards() {
  const dispatch = useAppDispatch();
  const { data: boardsFromServer } = useGetBoardsQuery();

  useEffect(() => {
    if (boardsFromServer) {
      dispatch(setBoardsFromServer(boardsFromServer.data));
    }
  }, [boardsFromServer, dispatch]);

  const boards = useAppSelector(selectBoards);
  return boards;
}
