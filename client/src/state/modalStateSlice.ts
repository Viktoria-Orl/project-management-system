import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface IModalState {
  open: boolean;
  boardId?: number;
  taskId?: number;
}

// в нач состоянии - состояние окна модального окна - закрыто
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
      if (action.payload.taskId) {
        state.taskId = action.payload.taskId;
      }
    },
    setClose: (state) => {
      state.open = false;
      state.boardId = undefined;
      state.taskId = undefined;
    },
  },
});

export const { setOpen, setClose } = modalStateSlice.actions;

export const selectModalOpen = (state: RootState) => state.modalState.open;
export const selectModalBoardId = (state: RootState) =>
  state.modalState.boardId;
export const selectModalTaskId = (state: RootState) => state.modalState.taskId;

export default modalStateSlice.reducer;
