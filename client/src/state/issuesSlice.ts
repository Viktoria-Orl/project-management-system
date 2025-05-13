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
      state.allTasks.push(action.payload);
    },
    // Экшн — это объект, описывающий, что должно произойти.
    // payload — данные для изменения.
    editIssue: (state, action: PayloadAction<ITask>) => {
      const index = state.allTasks.findIndex(
        (issue) => issue.id === action.payload.id,
      );
      if (index !== -1) {
        state.allTasks[index] = action.payload;
      }
    },
  },
});

// Экспортируем actions для использования в компонентах
export const {
  setIssuesFromServer,
  setIssuesByBoardFromServer,
  addIssue,
  editIssue,
} = issuesSlice.actions;

// Селектор: получает список задач из состояния
export const selectIssues = (state: RootState) => state.issues.allTasks;
export const selectIssueById = (state: RootState, id: number) =>
  state.issues.allTasks.find((task) => task.id === id);
export const selectIssuesByBoard = (state: RootState, boardId?: string) =>
  boardId ? state.issues.projectTasks[boardId] : [];

// Экспорт редюсера для подключения в store
export default issuesSlice.reducer;
