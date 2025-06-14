import { useDroppable } from "@dnd-kit/core";
import { ITask, TStatus } from "../types/types";
import { Typography, Col } from "antd";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

interface DroppableColumnProps {
  status: TStatus;
  tasks: ITask[];
  onEdit: (taskId: number) => void;
}

const { Title } = Typography;

export default function DroppableColumn({
  status,
  tasks,
  onEdit,
}: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: { status },
  });

  return (
    <Col key={status} span={8}>
      <Title level={2} style={{ margin: "15px 0px" }}>
        {status}
      </Title>
      <div ref={setNodeRef} style={{ minHeight: "100%" }}>
        <SortableContext
          id={status}
          items={tasks.map((task) => String(task.id))}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
        </SortableContext>
      </div>
    </Col>
  );
}
