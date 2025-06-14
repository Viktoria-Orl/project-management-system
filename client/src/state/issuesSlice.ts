import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ITask } from "../types/types";

// Типизация состояния slice (состоит из массива задач)
interface IssuesState {
  allTasks: ITask[];
  projectTasks: Record<string, ITask[]>; // в качестве ключа - id доски, значение - массив задач данной доски
}

// Начальное состояние
const initialState: IssuesState = {
  allTasks: [],
  projectTasks: {},
};

// Создание slice'а Redux Toolkit для управления задачами
export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    // Экшн — это объект, описывающий, что должно произойти.
    // payload — данные для изменения.
    setIssuesFromServer: (state, action: PayloadAction<ITask[]>) => {
      state.allTasks = action.payload;
    },
    setIssuesByBoardFromServer: (
      state,
      action: PayloadAction<{ boardId: string; tasks: ITask[] }>,
    ) => {
      state.projectTasks[action.payload.boardId] = action.payload.tasks;
    },
    addIssue: (state, action: PayloadAction<ITask>) => {
      const task = action.payload;
      if (state.allTasks?.length) {
        state.allTasks.push(task);
      }
      if (!state.projectTasks[task.boardId]) {
        state.projectTasks[task.boardId] = [];
      }
      state.projectTasks[task.boardId].push(task);
    },
    editIssue: (state, action: PayloadAction<ITask>) => {
      const updatedTask = action.payload;
      const index = state.allTasks.findIndex(
        (issue) => issue.id === updatedTask.id,
      );
      if (index !== -1) {
        state.allTasks[index] = updatedTask;
      }
      const tasks = state.projectTasks[updatedTask.boardId];
      if (tasks) {
        const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          tasks[taskIndex] = updatedTask;
        }
      }
    },
    editIssueStatus: (
      state,
      action: PayloadAction<Pick<ITask, "id" | "status"> & { boardId: string }>,
    ) => {
      if (state.allTasks?.length) {
        const index = state.allTasks.findIndex(
          (issue) => issue.id === action.payload.id,
        );
        if (index >= 0) {
          state.allTasks[index].status = action.payload.status;
        }
      }

      state.projectTasks[action.payload.boardId]?.forEach((task) => {
        if (task.id === action.payload.id) {
          task.status = action.payload.status;
        }
      });
    },
  },
});

// Экспортируем actions для использования в компонентах
export const {
  setIssuesFromServer,
  setIssuesByBoardFromServer,
  addIssue,
  editIssue,
  editIssueStatus,
} = issuesSlice.actions;

// Селектор: получает список задач из состояния
export const selectIssues = (state: RootState) => state.issues.allTasks;
export const selectIssueById = (state: RootState, taskId: number) =>
  state.issues.allTasks.find((task) => task.id === taskId);
export const selectIssuesByBoard = (state: RootState, boardId?: string) =>
  boardId ? state.issues.projectTasks[boardId] : [];

// Экспорт редюсеров для подключения в store
export default issuesSlice.reducer;
