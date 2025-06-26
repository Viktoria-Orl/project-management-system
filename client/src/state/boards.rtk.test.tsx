import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useGetBoardsQuery, useGetTasksFromBoardQuery } from "./boards.rtk";

describe("Tests for boardsApi", () => {
  const mockBoardsData = [
    { id: "1", title: "Board One" },
    { id: "2", title: "Board Two" },
  ];
  const wrapper = ({ children }: React.PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  it("Test useGetBoardsQuery", async () => {
    const { result } = renderHook(() => useGetBoardsQuery(), { wrapper });

    // Check initial state of the hook
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getBoards",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data?.data).toEqual(mockBoardsData);

    // Check the final state of the hook
    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName: "getBoards",
      data: { data: mockBoardsData },
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });

  it("Test useGetTasksFromBoardQuery", async () => {
    const { result } = renderHook(() => useGetTasksFromBoardQuery("1"), {
      wrapper,
    });

    // Check initial state of the hook
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getTasksFromBoard",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data?.data).toEqual(mockBoardsData[0]);

    // Check the final state of the hook
    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName: "getTasksFromBoard",
      data: { data: mockBoardsData[0] },
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
  });
});
