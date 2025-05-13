import { useParams } from "react-router-dom";
import { statuses } from "../data";
import { useBoards } from "../hooks/useBoards";
import { useAppDispatch } from "../state/hooks";
import { setOpen } from "../state/modalStateSlice";
import { Typography, Col, Row } from "antd";
import TaskCard from "../components/TaskCard";
import { ITask } from "../types/types";
import { useTasksFromBoard } from "../hooks/useTasksFromBoard";
//добавить Смену статуса задачи на доске посредством Drag-and-drop

const { Title } = Typography;

export default function BoardDetailsPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const boardTasks = useTasksFromBoard(id);
  const boards = useBoards();
  const board = boards.find((b) => b.id === Number(id));

  if (!board) return <p>Доска не найдена</p>;

  const handleEdit = (task: ITask) => {
    dispatch(setOpen({ task })); // для редактирования задачи передаем task
  };

  return (
    <>
      <Title>{board.name}</Title>
      <div
        style={{
          height: "81vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: 8,
        }}
      >
        <Row gutter={8}>
          {statuses.map((status) => (
            <Col key={status} span={8}>
              <Title level={2} style={{ margin: "15px 0px" }}>
                {status}
              </Title>
              {boardTasks
                ?.filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard key={task.id} task={task} onEdit={handleEdit} />
                ))}
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
