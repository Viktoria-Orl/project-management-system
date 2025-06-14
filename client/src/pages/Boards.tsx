import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import useBoards from "../hooks/useBoards";

export default function Boards() {
  const navigate = useNavigate();
  const boards = useBoards();

  return (
    <>
      {boards.map((board) => (
        <Card
          key={board.id}
          title={board.name}
          hoverable
          onClick={() => navigate(`/board/${board.id}`)}
          extra={"Перейти к доске"}
          style={{
            width: "100%",
            cursor: "pointer",
            borderRadius: "12px",
            margin: "16px 0",
            /* borderBottom: "0px", */
          }}
          classNames={{
            body: "my-card",
          }}
          styles={{
            body: { display: "none" },
            header: { borderBottom: "0px" },
          }}
        ></Card>
      ))}
    </>
  );
}
