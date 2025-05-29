import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const mockBoards = [
  { id: "1", title: "Board One" },
  { id: "2", title: "Board Two" },
];

export const server = setupServer(
  http.get("/boards", () => {
    return HttpResponse.json({
      data: mockBoards,
    });
  }),
  http.get("/boards/:id", ({ request }) => {
    const id = request.url.split("/").pop();

    return HttpResponse.json({
      data: { id, title: Number(id) === 1 ? "Board One" : "Board Two" },
    });
  }),
);
