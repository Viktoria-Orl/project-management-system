import { api } from "../api/api";
import { ITask, TPriority, TStatus } from "../types/types";

export type CreateUpdateTask = {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: TPriority;
  status: TStatus;
  title: string;
};

type CreateTaskResponse = {
  id: number;
};

type UpdateTaskResponse = {
  message: string;
};
type UpdateTaskStatus = {
  status: TStatus;
};

//injectEndpoints — это метод расширения API
const issuesApi = api.injectEndpoints({
  // где каждый endpoints описывает, какие действия можно выполнять с API
  endpoints: (build) => ({
    //GET-запрос на /tasks, чтобы получить список всех задач.
    getTasks: build.query<{ data: ITask[] }, void>({
      query: () => "tasks",
    }),
    //GET-запрос на /tasks/{taskId} для получения одной задачи по ID.
    getTaskById: build.query<{ data: ITask }, { taskId: number }>({
      query: (taskId) => `tasks/${taskId}`,
    }),
    //POST-запрос на /tasks/create, чтобы создать новую задачу
    createNewTask: build.mutation<CreateTaskResponse, CreateUpdateTask>({
      query: (data) => ({
        url: "tasks/create",
        method: "POST",
        body: data,
      }),
    }),
    //PUT-запрос на /tasks/update/{taskId}, чтобы обновить задачу целиком.
    updateTask: build.mutation<
      UpdateTaskResponse,
      { taskId: number; data: CreateUpdateTask }
    >({
      query: ({ taskId, data }) => ({
        url: `tasks/update/${taskId}`,
        method: "PUT",
        body: data,
      }),
    }),
    //PUT-запрос на /tasks/updateStatus/{taskId}, чтобы изменить только статус.
    updateTaskStatus: build.mutation<
      UpdateTaskResponse,
      { taskId: number; data: UpdateTaskStatus }
    >({
      query: ({ taskId, data }) => ({
        url: `tasks/updateStatus/${taskId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
} = issuesApi;
