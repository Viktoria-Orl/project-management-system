import { useParams } from "react-router-dom";
import { statuses } from "../data";
import useBoards from "../hooks/useBoards";
import useTasksFromBoard from "../hooks/useTasksFromBoard";
import { useAppDispatch } from "../state/hooks";
import { setOpen } from "../state/modalStateSlice";
import { Typography, Row } from "antd";
import useEditTaskStatus from "../hooks/useEditTaskStatus";
import { ITask, TStatus } from "../types/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import DroppableColumn from "../components/DroppableColumn";
import { useMemo, useState } from "react";
import TaskCard from "../components/TaskCard";

const { Title } = Typography;

export default function BoardDetailsPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const boardTasks = useTasksFromBoard(id);
  const boards = useBoards();
  const board = boards.find((b) => b.id === Number(id));
  const changeStatus = useEditTaskStatus(id);
  const sensors = useSensors(useSensor(PointerSensor));

  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const tasksByStatus = useMemo(() => {
    return statuses.reduce(
      (acc, status) => {
        acc[status] =
          boardTasks?.filter((task) => task.status === status) || [];
        return acc;
      },
      {} as Record<string, ITask[]>,
    );
  }, [boardTasks]);

  if (!board) return <p>Доска не найдена</p>;

  const handleEdit = (taskId: number) => {
    dispatch(setOpen({ taskId })); // для редактирования задачи передаем task
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const task = boardTasks?.find((task) => task.id === Number(active.id));
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = Number(active.id);
    const newStatus = over.data?.current?.status as TStatus;
    if (!statuses.includes(newStatus)) return;

    const task = boardTasks?.find((task) => task.id === activeId);
    if (!task || task.status === newStatus) return;

    changeStatus(activeId, newStatus);
    setActiveTask(null);
  };

  return (
    <>
      <Title>{board.name}</Title>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: 8,
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Row gutter={8}>
            {statuses.map((status) => (
              <DroppableColumn
                key={status}
                status={status}
                tasks={tasksByStatus[status]}
                onEdit={handleEdit}
              ></DroppableColumn>
            ))}
          </Row>

          <DragOverlay>
            {activeTask ? (
              <TaskCard task={activeTask} onEdit={() => {}} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
