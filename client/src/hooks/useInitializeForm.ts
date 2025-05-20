import { FormInstance } from "antd";
import { ITask } from "../types/types";
import { useEffect } from "react";
import { taskModalDraftStorage } from "../utils/draftStorage";

interface IProps {
  open: boolean;
  isEdit: boolean;
  isFromBoard: boolean;
  currentBoardName: string | undefined;
  task: ITask | undefined;
  form: FormInstance;
}

export default function useInitializeForm({
  open,
  isEdit,
  task,
  form,
  isFromBoard,
  currentBoardName,
}: IProps) {
  useEffect(() => {
    const draft = taskModalDraftStorage.load();
    if (isEdit && task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        board: task.boardName,
        priority: task.priority,
        status: task.status,
        assignee: task.assignee.fullName,
      });
    } else if (isFromBoard) {
      form.setFieldsValue({
        ...draft,
        board: currentBoardName,
      });
    } else {
      if (draft && open) {
        form.setFieldsValue(draft);
      } else {
        form.resetFields();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, task, form, isFromBoard]);
}
