import { useAppDispatch } from "../state/hooks";
import { editIssueStatus } from "../state/issuesSlice";
import { useUpdateTaskStatusMutation } from "../state/issues.rtk";
import { TStatus } from "../types/types";

export default function useEditTaskStatus(boardId?: string) {
  const dispatch = useAppDispatch();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const changeStatus = async (taskId: number, taskStatus: TStatus) => {
    // 1) С помощью редьюсера поменяли статус задачи в Redux Store
    if (boardId) {
      dispatch(editIssueStatus({ id: taskId, status: taskStatus, boardId }));
    }

    // 2) поменяли статус задачи на сервере
    try {
      await updateTaskStatus({
        taskId,
        data: { status: taskStatus },
      }).unwrap();
    } catch (error) {
      console.log("Ошибка обновления статуса задачи:", error);
    }
  };

  return changeStatus;
}
