import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useGetTasksQuery } from "../state/issues.rtk";
import { setIssuesFromServer, selectIssues } from "../state/issuesSlice";

export function useTasks() {
  const dispatch = useAppDispatch();
  // 1) Получаем данные с сервера
  const { data: tasksFromServer } = useGetTasksQuery();

  useEffect(() => {
    if (tasksFromServer) {
      // 2) Загрузили задачи, положили в Redux Store
      dispatch(setIssuesFromServer(tasksFromServer.data));
    }
  }, [tasksFromServer, dispatch]);
  // 3) С помощью селектора достали значение из Redux Store
  const tasks = useAppSelector(selectIssues);
  return tasks;
}
