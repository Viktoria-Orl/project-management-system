import { rest } from "msw";
import { setupServer } from "msw/node";

const baseUrl = "http://localhost:8080/api/v1/";
export const mockBoards = [
  { id: "1", title: "Board One" },
  { id: "2", title: "Board Two" },
];

export const mockIssues = [
  { id: 1, title: "task 1", status: "InProgress" },
  { id: 2, title: "task 2", status: "Backlog" },
  { id: 3, title: "task 3", status: "InProgress" },
];
let nextId = 4;

export const server = setupServer(
  //запросы для issues.rtk
  rest.get(`${baseUrl}tasks`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockIssues }));
  }),
  rest.get(`${baseUrl}tasks/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        data: mockIssues.find((t) => t.id === Number(id)),
      }),
    );
  }),
  rest.post(`${baseUrl}tasks/create`, async (req, res, ctx) => {
    const newTask = await req.json();
    const createdTask = { id: nextId++, ...newTask };
    mockIssues.push(createdTask);
    return res(ctx.status(201), ctx.json({ id: createdTask.id }));
  }),
  rest.put(`${baseUrl}tasks/update/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const updatedData = await req.json();
    const index = mockIssues.findIndex((task) => task.id === Number(id));
    mockIssues[index] = { ...mockIssues[index], ...updatedData };

    return res(ctx.status(200), ctx.json({ message: "Задача обновлена" }));
  }),
  rest.put(`${baseUrl}tasks/updateStatus/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const updatedStatus = await req.json();
    const index = mockIssues.findIndex((task) => task.id === Number(id));
    mockIssues[index] = { ...mockIssues[index], status: updatedStatus };

    return res(
      ctx.status(200),
      ctx.json({ message: "Статус задачи обновлен" }),
    );
  }),
  //запросы для boards.rtk
  rest.get(`${baseUrl}boards`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: mockBoards }));
  }),
  rest.get(`${baseUrl}boards/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const board = mockBoards.find((b) => b.id === id);

    if (!board) {
      return res(ctx.status(404), ctx.json({ message: "Board not found" }));
    }

    return res(ctx.status(200), ctx.json({ data: board }));
  }),
);
