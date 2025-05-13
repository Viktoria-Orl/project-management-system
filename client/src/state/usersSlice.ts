import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IUser } from "../types/types";

// Типизация состояния slice
interface UsersState {
  value: IUser[];
}

// Начальное состояние
const initialState: UsersState = {
  value: [],
};

// Создание slice'а Redux Toolkit для управления задачами
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Экшн — это объект, описывающий, что должно произойти.
    // Он имеет type и  payload — данные для изменения.
    setUsersFromServer: (state, action: PayloadAction<IUser[]>) => {
      state.value = action.payload;
    },
  },
});

// Экспортируем actions для использования в компонентах
export const { setUsersFromServer } = usersSlice.actions;

// Селектор: получает список досок из состояния
export const selectUsers = (state: RootState) => state.users.value;

// Экспорт редюсера для подключения в store
export default usersSlice.reducer;
