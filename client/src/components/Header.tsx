import { Button, Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { setOpen } from "../state/modalStateSlice";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items = [
    {
      label: "Все задачи",
      key: "/issues",
    },
    {
      label: "Проекты",
      key: "/boards",
    },
  ];

  const pathParts = location.pathname.split("/").filter(Boolean);
  const isFromBoard = pathParts[0] === "board";
  const boardId = isFromBoard ? Number(pathParts[1]) : undefined;

  // по клику открывается модальное окно
  const handleOpen = () => {
    dispatch(setOpen({ boardId })); // если со страницы доски, то передается boardId
  };

  const taskModalButton = (
    <Button type="primary" onClick={handleOpen}>
      Создать задачу
    </Button>
  );

  return (
    <Tabs
      tabBarExtraContent={taskModalButton}
      activeKey={location.pathname}
      onChange={(key) => navigate(key)}
      type="card"
      items={items}
    />
  );
}
