import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { addIssue, selectIssueById } from "../state/issuesSlice";
import { useGetTaskByIdQuery } from "../state/issues.rtk";

export default function useTaskById(taskId?: number) {
  const dispatch = useAppDispatch();

  // 1) С помощью селектора достали значение задачи из Redux Store
  const localTask = useAppSelector((state) =>
    taskId !== undefined ? selectIssueById(state, taskId) : undefined,
  );

  // 2) если нет задачи в сторе - Получаем данные с сервера

  const { data: taskFromServerById } = useGetTaskByIdQuery(
    taskId as number,
    { skip: taskId === undefined || Boolean(localTask) }, // пропускаем запрос, если задача уже есть или не передан taskId
  );

  // 3) Если задача пришла с сервера и ее еще нет в store — кладем её
  useEffect(() => {
    if (!localTask && taskFromServerById) {
      dispatch(addIssue(taskFromServerById.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskFromServerById]);

  // 4) Возвращаем локальную или загруженную с сервера задачу
  return localTask ? localTask : taskFromServerById?.data;
}
