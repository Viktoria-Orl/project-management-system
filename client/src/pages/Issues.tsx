import { useState } from "react";
import { Input, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import Highlighter from "react-highlight-words";
import type { ITask } from "../types/types";
import { statuses, priorities } from "../data";
import useTasks from "../hooks/useTasks";
import useBoards from "../hooks/useBoards";
import { useAppDispatch } from "../state/hooks";
import { setOpen } from "../state/modalStateSlice";

interface IDataSource extends ITask {
  key: number;
}

export default function Issues() {
  const [searchText, setSearchText] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  const tasks = useTasks();
  const boards = useBoards();
  const dispatch = useAppDispatch();

  const handleEdit = (taskId: number) => {
    dispatch(setOpen({ taskId })); // для редактирования задачи передаем task
  };

  //Поиск по названию задачи и исполнителю
  const filteredDataSource: IDataSource[] = (tasks || [])
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        task.assignee.fullName
          .toLowerCase()
          .includes(searchText.toLowerCase().trim()),
    )
    .map((task) => ({ ...task, key: task.id }));

  const columns: TableColumnsType<IDataSource> = [
    {
      title: "Название задачи",
      dataIndex: "title",
      key: "title",
      width: "35%",
      render: (text: string) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text || ""}
        />
      ),
    },
    {
      title: "Исполнитель",
      dataIndex: "assignee",
      key: "assignee",
      width: "20%",
      minWidth: 105,
      render: (assignee: { fullName: string }) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={assignee?.fullName || ""}
        />
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      width: "10%",
      minWidth: 80,
      onFilter: (value, record) => record.status === value,
      filters: statuses.map((status) => ({ text: status, value: status })),
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      key: "priority",
      width: "10%",
      minWidth: 105,
      sorter: (a, b) =>
        priorities.indexOf(a.priority) - priorities.indexOf(b.priority),
    },
    {
      title: "Доска",
      dataIndex: "boardName",
      key: "boardName",
      width: "25%",
      onFilter: (value, record) => record.boardName === value,
      filters: boards.map((board) => ({
        text: board.name,
        value: board.name,
      })),
    },
    Table.EXPAND_COLUMN,
  ];

  return (
    <Space direction="vertical" size="small" style={{ display: "flex" }}>
      <Input
        placeholder="Поиск по названию задачи или исполнителю"
        onChange={handleChange}
      />
      <Table
        tableLayout="auto"
        columns={columns}
        expandable={{
          expandedRowRender: (task) => (
            <p style={{ margin: 0 }}>Описание: {task.description}</p>
          ),
        }}
        dataSource={filteredDataSource}
        pagination={false}
        scroll={{ x: "min-content" }}
        size="small"
        bordered
        onRow={(task) => {
          return {
            onClick: () => {
              handleEdit(task.id);
            },
            style: { cursor: "pointer" },
          };
        }}
      ></Table>
    </Space>
  );
}
