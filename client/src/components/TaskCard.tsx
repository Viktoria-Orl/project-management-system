import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ITask } from "../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ITaskCardProps {
  task: ITask;
  onEdit: (taskId: number) => void;
}

export default function TaskCard({ task, onEdit }: ITaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(task.id),
    data: { status: task.status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 12,
    borderRadius: 12,
    cursor: "grab",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div style={{ width: "90%", position: "relative" }}>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card
          size="small"
          title={task.title}
          // extra={
          //   <EditOutlined
          //     key="edit"
          //     onClick={() => {
          //       // функция-обёртка, которую React вызовет при клике
          //       onEdit(task.id);
          //     }}
          //     style={{ cursor: "pointer" }}
          //   />
          // }
          styles={{
            title: {
              overflow: "visible",
              whiteSpace: "normal",
            },
            header: {
              width: "95%",
            },
          }}
        >
          <p>Исполнитель: {task.assignee.fullName}</p>
          <p>Приоритет: {task.priority}</p>
        </Card>
      </div>

      <EditOutlined
        key="edit"
        onClick={() => {
          // функция-обёртка, которую React вызовет при клике
          onEdit(task.id);
        }}
        style={{
          position: "absolute",
          top: "15px",
          right: "10px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}
