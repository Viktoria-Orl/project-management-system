import { render, screen } from "@testing-library/react";
import Boards from "./Boards";
import { BrowserRouter } from "react-router-dom";

jest.mock("../hooks/useBoards", () => ({
  __esModule: true,
  default: () => [
    {
      id: "1",
      name: "Test name",
      description: "Test description",
      taskCount: 123,
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
    expect(screen.getByText("Test name")).toBeInTheDocument();
  });
});
