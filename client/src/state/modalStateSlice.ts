import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ITask } from "../types/types";

interface IModalState {
  open: boolean;
  boardId?: number;
  task?: ITask;
}

// в нач состоянии - состояние окна модального окна - закрыто или открыто
const initialState: IModalState = {
  open: false,
};

export const modalStateSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<Omit<IModalState, "open">>) => {
      state.open = true;
      if (action.payload.boardId) {
        state.boardId = action.payload.boardId;
      }
      if (action.payload.task) {
        state.task = action.payload.task;
      }
    },
    setClose: (state) => {
      state.open = false;
      state.boardId = undefined;
      state.task = undefined;
    },
  },
});

export const { setOpen, setClose } = modalStateSlice.actions;

export const selectModalOpen = (state: RootState) => state.modalState.open;
export const selectModalBoardId = (state: RootState) =>
  state.modalState.boardId;
export const selectModalTask = (state: RootState) => state.modalState.task;

export default modalStateSlice.reducer;
