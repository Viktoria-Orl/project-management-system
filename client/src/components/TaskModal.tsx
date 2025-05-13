import { useState, useEffect } from "react";
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
} from "../state/issues.rtk";
import { addIssue } from "../state/issuesSlice";

function getOptions(array: string[]) {
  return array.map((item) => ({
    value: item,
    label: item,
  }));
}

export default function TaskModal() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectModalOpen);
  const task = useAppSelector(selectModalTask);
  const isEdit = !!task;
  const boardId = useAppSelector(selectModalBoardId);
  const isFromBoard = !!boardId;
  console.log(boardId);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const users = useUsers();
  const userOptions = users.map((user) => ({
    value: user.fullName,
    label: user.fullName,
  }));

  const boards = useBoards();
  const boardOptions = boards.map((board) => ({
    value: board.name,
    label: board.name,
  }));

  const currentBoardName = isFromBoard
    ? boards.find((b) => b.id === boardId)?.name
    : undefined;

  const navigate = useNavigate();
  const location = useLocation();
  const isFromIssuesPage = location.pathname === "/issues";

  const handleNavigateToBoard = () => {
    if (isEdit) {
      const boardForNavigate = boards.find((b) => b.name === task.boardName);
      navigate(`/board/${boardForNavigate?.id}`);
      dispatch(setClose());
    }
  };

  useEffect(() => {
    if (isEdit) {
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
        board: currentBoardName,
      });
    } else {
      form.resetFields();
    }
  }, [isEdit, task, form, isFromBoard, currentBoardName]);

  /*   
  // внутри компонента модального окна
  const handleCreate = () => {
    const newTask = {
      assigneeId: 0,
      boardId: 0,
      description: "string",
      priority: "Medium",
      status: "Done",
      title: "string",
    };

    // 4) Отправляем новую задачу на сервер, чтобы она появилась в БД
    createNewTask(newTask)
      .unwrap() // функция которая возвращает промис
      // 5) Добавляем задачу в Redux Store, чтобы она появилась в нашем списке
      .then((response) => dispatch(addIssue({ ...newTask, id: response.id })))
      .catch((error) => console.log(error));
  };
  // */

  const [createNewTask] = useCreateNewTaskMutation();

  //отправка или редактирование задачи
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
        boardId: board.id,
        assigneeId: assignee.id,
      };

      // TODO: отправка данных (edit / create)
      console.log("Submit:", dataToSubmit);

      createNewTask(dataToSubmit)
        .unwrap() // функция которая возвращает промис
        // 5) Добавляем задачу в Redux Store, чтобы она появилась в нашем списке
        .then((response) =>
          dispatch(
            addIssue({
              ...dataToSubmit,
              id: response.id,
              status: "InProgress",
              boardName: board.name,
              assignee: assignee,
            }),
          ),
        )
        .catch((error) => console.log("Ошибка создания задачи:", error));

      setTimeout(() => {
        setConfirmLoading(false);
        dispatch(setClose());
      }, 1000);
    });
  };

  const handleCancel = () => {
    dispatch(setClose());
  };

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
      <Form layout="vertical" form={form}>
        <Form.Item label="Название" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Проект" name="board">
          <Select disabled={!!boardId} options={boardOptions} />
        </Form.Item>
        <Form.Item label="Приоритет" name="priority">
          <Select options={getOptions(priorities)}></Select>
        </Form.Item>
        <Form.Item label="Статус" name="status">
          <Select options={getOptions(statuses)}></Select>
        </Form.Item>
        <Form.Item label="Исполнитель" name="assignee">
          <Select options={userOptions}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
