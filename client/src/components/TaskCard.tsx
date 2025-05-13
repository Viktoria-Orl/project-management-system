import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ITask } from "../types/types";

interface ITaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
}

export default function TaskCard({ task, onEdit }: ITaskCardProps) {
  return (
    <Card
      size="small"
      title={task.title}
      style={{ width: "90%", marginBottom: 12, borderRadius: 12 }}
      extra={
        <EditOutlined
          key="edit"
          onClick={() => {
            // функция-обёртка, которую React вызовет при клике
            onEdit(task);
          }}
          style={{ cursor: "pointer" }}
        />
      }
      styles={{
        title: {
          overflow: "visible",
          whiteSpace: "normal",
        },
      }}
    >
      <p>Исполнитель: {task.assignee.fullName}</p>
      <p>Приоритет: {task.priority}</p>
    </Card>
  );
}
