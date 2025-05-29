import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useGetBoardsQuery } from "./boards.rtk";

describe("Tests for boardsApi", () => {
  it("Test useGetBoardsQuery", () => {
    const wrapper = ({ children }: React.PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useGetBoardsQuery(), { wrapper });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.data).toEqual([
      { id: "1", title: "Board One" },
      { id: "2", title: "Board Two" },
    ]);
  });
});
