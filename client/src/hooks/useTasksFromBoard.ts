import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  selectIssuesByBoard,
  setIssuesByBoardFromServer,
} from "../state/issuesSlice";
import { useGetTasksFromBoardQuery } from "../state/boards.rtk";

export function useTasksFromBoard(boardId?: string) {
  const dispatch = useAppDispatch();
  // 1) Получаем данные с сервера с помозью апи досок
  const { data: tasksByBoardFromServer } = useGetTasksFromBoardQuery(
    boardId as string, // так как есть skip, то используем type assertion, исключаем undefined
    { skip: !boardId }, // свойство запроса - пропустить если нет boardId
  );

  useEffect(() => {
    if (boardId && tasksByBoardFromServer) {
      // 2) Загрузили задачи конкретной доски, положили в Redux Store
      dispatch(
        setIssuesByBoardFromServer({
          boardId,
          tasks: tasksByBoardFromServer.data,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksByBoardFromServer]);

  // 3) С помощью селектора достали значение из Redux Store
  const tasksFromBoard = useAppSelector((state) =>
    selectIssuesByBoard(state, boardId),
  );

  return tasksFromBoard;
}
