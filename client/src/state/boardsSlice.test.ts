import { IBoard } from "../types/types";
import reducer, {
  boardsSlice,
  selectBoards,
  setBoardsFromServer,
} from "./boardsSlice";
import { RootState } from "./store";

const mockBoards: IBoard[] = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Description of Project Alpha",
    taskCount: 5,
  },
  {
    id: 2,
    name: "Project Beta",
    description: "Description of Project Beta",
    taskCount: 3,
  },
];

describe("boardsSlice tests", () => {
  it("Test initial state", () => {
    const initialState = { value: [] };

    expect(boardsSlice.getInitialState()).toEqual(initialState);
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("Test setBoardsFromServer reducer", () => {
    const initialState = { value: [] };
    const action = setBoardsFromServer(mockBoards);
    const newState = reducer(initialState, action);

    expect(newState.value).toHaveLength(2);
    expect(newState.value[0].name).toBe("Project Alpha");
    expect(newState.value[1].name).toBe("Project Beta");
  });

  it("Test selectBoards selector", () => {
    const store = {
      boards: {
        value: mockBoards,
      },
    } as RootState;

    expect(selectBoards(store)).toEqual(mockBoards);
  });
});
