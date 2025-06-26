import { renderHook, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
} from "./issues.rtk";
import { TPriority, TStatus } from "../types/types";

describe("Tests for issuesApi", () => {
  const mockIssuesData = [
    { id: 1, title: "task 1", status: "InProgress" },
    { id: 2, title: "task 2", status: "Backlog" },
    { id: 3, title: "task 3", status: "InProgress" },
  ];
  const mockIssue = {
    title: "new task",
    assigneeId: 1,
    boardId: 1,
    description: "new task",
    priority: "High" as TPriority,
    status: "Backlog" as TStatus,
  };
  const wrapper = ({ children }: React.PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  it("Test useGetTasksQuery", async () => {
    const { result } = renderHook(() => useGetTasksQuery(), { wrapper });

    // Проверка начального состояния запроса
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getTasks",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // Проверка выполнения запроса
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data?.data).toEqual(mockIssuesData);

    // Проверка конечного состояния запроса
    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName: "getTasks",
      data: { data: mockIssuesData },
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });

  it("Test getTaskById", async () => {
    const { result } = renderHook(() => useGetTaskByIdQuery(3), {
      wrapper,
    });

    // Проверка начального состояния запроса
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getTaskById",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // Проверка выполнения запроса
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data?.data).toEqual(mockIssuesData[2]);

    // Проверка конечного состояния запроса
    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName: "getTaskById",
      data: { data: mockIssuesData[2] },
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });

  it("Test createNewTask", async () => {
    const { result } = renderHook(() => useCreateNewTaskMutation(), {
      wrapper,
    });

    //при Mutation запросе result.current — это массив: [trigger, state]
    // где trigger - функция для запуска
    // state — объект со статусами, поэтому деструктурируем мутацию
    const [updateTask, mutationState] = result.current;

    // Проверка начального состояния запроса
    expect(mutationState).toMatchObject({
      isLoading: false,
      isSuccess: false,
      isError: false,
      status: "uninitialized",
    });

    // Mutating, где act гарантирует, что все изменения состояния
    // и побочные эффекты полностью завершены перед проверками (expect).
    await act(async () => {
      await updateTask(mockIssue);
    });

    // Проверка выполнения изменения данных
    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });

    // Проверка конечного состояния запроса
    expect(result.current[1]).toMatchObject({
      status: "fulfilled",
      isLoading: false,
      isSuccess: true,
      isError: false,
    });
  });

  it("Test updateTask", async () => {
    const { result } = renderHook(() => useUpdateTaskMutation(), {
      wrapper,
    });

    const [updateTask, mutationState] = result.current;

    // Проверка начального состояния запроса
    expect(mutationState).toMatchObject({
      isLoading: false,
      isSuccess: false,
      isError: false,
      status: "uninitialized",
    });

    // Mutating, где act гарантирует, что все изменения состояния
    // и побочные эффекты полностью завершены перед проверками (expect).
    await act(async () => {
      await updateTask({
        taskId: 2,
        data: { ...mockIssue, title: "updated task 2" },
      });
    });

    // Проверка выполнения изменения данных
    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });
    expect(result.current[1].data).toEqual({ message: "Задача обновлена" });

    // Проверка конечного состояния запроса
    expect(result.current[1]).toMatchObject({
      status: "fulfilled",
      isLoading: false,
      isSuccess: true,
      isError: false,
    });
  });

  it("Test updateTaskStatus", async () => {
    const { result } = renderHook(() => useUpdateTaskStatusMutation(), {
      wrapper,
    });

    const [updateTask, mutationState] = result.current;

    // Проверка начального состояния запроса
    expect(mutationState).toMatchObject({
      isLoading: false,
      isSuccess: false,
      isError: false,
      status: "uninitialized",
    });

    // Mutating, где act гарантирует, что все изменения состояния
    // и побочные эффекты полностью завершены перед проверками (expect).
    await act(async () => {
      await updateTask({
        taskId: 2,
        data: { status: "Done" },
      });
    });

    // Проверка выполнения изменения данных
    await waitFor(() => {
      expect(result.current[1].isSuccess).toBe(true);
    });
    expect(result.current[1].data).toEqual({
      message: "Статус задачи обновлен",
    });

    // Проверка конечного состояния запроса
    expect(result.current[1]).toMatchObject({
      status: "fulfilled",
      isLoading: false,
      isSuccess: true,
      isError: false,
    });
  });
});
