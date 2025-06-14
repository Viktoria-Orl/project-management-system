import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useGetBoardsQuery } from "../state/boards.rtk";
import { setBoardsFromServer, selectBoards } from "../state/boardsSlice";

export default function useBoards() {
  const dispatch = useAppDispatch();
  const { data: boardsFromServer } = useGetBoardsQuery();

  useEffect(() => {
    if (boardsFromServer) {
      dispatch(setBoardsFromServer(boardsFromServer.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardsFromServer]);

  const boards = useAppSelector(selectBoards);
  return boards;
}
