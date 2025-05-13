import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IBoard } from "../types/types";

// Типизация состояния slice
interface BoardsState {
  value: IBoard[];
}

// Начальное состояние
const initialState: BoardsState = {
  value: [],
};

// Создание slice'а Redux Toolkit для управления задачами
export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // Экшн — это объект, описывающий, что должно произойти.
    // payload — данные для изменения.
    setBoardsFromServer: (state, action: PayloadAction<IBoard[]>) => {
      state.value = action.payload;
    },
  },
});

// Экспортируем actions для использования в компонентах
export const { setBoardsFromServer } = boardsSlice.actions;

// Селектор: получает список досок из состояния
export const selectBoards = (state: RootState) => state.boards.value;

// Экспорт редюсера для подключения в store
export default boardsSlice.reducer;
