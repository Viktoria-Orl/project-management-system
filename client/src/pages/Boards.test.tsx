import { render, screen } from "@testing-library/react";
import Boards from "./Boards";
import { BrowserRouter } from "react-router-dom";

jest.mock("../hooks/useBoards", () => ({
  __esModule: true,
  default: () => [
    {
      id: "1",
      name: "Board 1",
      description: "Board 1 description",
      taskCount: 123,
    },
    {
      id: "2",
      name: "Board 2",
      description: "Board 2 description",
      taskCount: 12,
    },
  ],
}));

describe("Tests for Boards component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Test initial render", () => {
    render(
      <BrowserRouter>
        <Boards />
      </BrowserRouter>,
    );
    expect(screen.getByText("Board 1")).toBeInTheDocument();
    expect(screen.getByText("Board 2")).toBeInTheDocument();
  });
});
