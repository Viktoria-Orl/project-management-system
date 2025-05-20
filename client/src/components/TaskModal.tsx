import { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import {
  selectModalOpen,
  selectModalTask,
  selectModalBoardId,
  setClose,
} from "../state/modalStateSlice";
import { useBoards } from "../hooks/useBoards";
import { useUsers } from "../hooks/useUsers";
import { priorities, statuses } from "../data";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateUpdateTask,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
} from "../state/issues.rtk";
import { addIssue, editIssue } from "../state/issuesSlice";
import { taskModalDraftStorage } from "../utils/draftStorage";
import getOptions from "../utils/getOptions";
import useInitializeForm from "../hooks/useInitializeForm";

export default function TaskModal() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectModalOpen);
  const task = useAppSelector(selectModalTask);
  const isEdit = Boolean(task);
  const boardId = useAppSelector(selectModalBoardId);
  const isFromBoard = Boolean(boardId);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const users = useUsers();
  const boards = useBoards();

  const currentBoardName = isFromBoard
    ? boards.find((b) => b.id === boardId)?.name
    : undefined;

  const navigate = useNavigate();
  const location = useLocation();
  const isFromIssuesPage = location.pathname === "/issues";

  const [createNewTask] = useCreateNewTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  //хук для заполнения полей формы
  useInitializeForm({
    open,
    isEdit,
    task,
    form,
    isFromBoard,
    currentBoardName,
  });

  //клик по кнопке ок при отправке или редактировании задачи
  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true); // Включаем индикатор загрузки

      const board = isFromBoard // доску берем если перешли со страницы досок
        ? boards.find((b) => b.id === boardId)
        : boards.find((b) => b.name === values.board); // или из значения пустой формы
      const assignee = users.find((u) => u.fullName === values.assignee);

      // Проверка  полей board и assignee
      if (!board) {
        console.error("Доска не найдена");
        setConfirmLoading(false);
        return;
      }

      if (!assignee) {
        console.error("Пользователь не найден");
        setConfirmLoading(false);
        return;
      }

      const dataToSubmit: CreateUpdateTask = {
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: values.status,
        boardId: board.id,
        assigneeId: assignee.id,
      };

      console.log("Submit:", dataToSubmit);

      if (isEdit && task) {
        // 5) Добавляем задачу в Redux Store, чтобы она появилась в нашем списке
        updateTask({ taskId: task.id, data: dataToSubmit })
          .unwrap() // функция которая возвращает промис
          // 5) Добавляем задачу в Redux Store, чтобы она появилась в нашем списке
          .then(() => {
            dispatch(
              editIssue({
                ...dataToSubmit,
                id: task.id,
                boardName: board.name,
                assignee: assignee,
              }),
            );
          })
          .catch((error) => console.error("Ошибка обновления задачи:", error));
      } else {
        createNewTask(dataToSubmit)
          .unwrap()
          .then((response) =>
            dispatch(
              addIssue({
                ...dataToSubmit,
                id: response.id,
                status: "Backlog",
                boardName: board.name,
                assignee: assignee,
              }),
            ),
          )
          .catch((error) => console.log("Ошибка создания задачи:", error));
      }

      setTimeout(() => {
        taskModalDraftStorage.clear();
        setConfirmLoading(false);
        dispatch(setClose());
      }, 1000);
    });
  };

  //клик по кнопке отмены или области вне модального окна
  const handleCancel = () => {
    dispatch(setClose());
  };

  //клин по кнопке "перейти на доску"
  const handleNavigateToBoard = () => {
    if (isEdit && task) {
      const boardForNavigate = boards.find((b) => b.name === task.boardName);
      navigate(`/board/${boardForNavigate?.id}`);
      dispatch(setClose());
    }
  };

  function handleValuesChange(
    _: Partial<CreateUpdateTask>, // "заглушка" для changedValues - первого аргумента колбэка onValuesChange
    values: Partial<CreateUpdateTask>,
  ) {
    if (!isEdit) {
      taskModalDraftStorage.save(values);
    }
  }

  return (
    <Modal
      title={isEdit ? "Редактирование задачи" : "Создание задачи"}
      open={open}
      destroyOnClose
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        isEdit && isFromIssuesPage && (
          <Button key="toBoard" onClick={handleNavigateToBoard}>
            Перейти на доску
          </Button>
        ),
        <Button key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
        >
          {isEdit ? "Обновить" : "Создать"}
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} onValuesChange={handleValuesChange}>
        <Form.Item label="Название" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Проект" name="board">
          <Select
            disabled={!!boardId}
            options={getOptions(boards.map((board) => board.name))}
          />
        </Form.Item>
        <Form.Item label="Приоритет" name="priority">
          <Select options={getOptions(priorities)}></Select>
        </Form.Item>
        <Form.Item label="Статус" name="status">
          <Select options={getOptions(statuses)}></Select>
        </Form.Item>
        <Form.Item label="Исполнитель" name="assignee">
          <Select
            options={getOptions(users.map((user) => user.fullName))}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
