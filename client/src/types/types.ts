export type TPriority = "High" | "Medium" | "Low";
export type TStatus = "Backlog" | "InProgress" | "Done";

export interface ITask {
  id: number;
  title: string;
  description: string;
  priority: TPriority;
  status: TStatus;
  boardId: number;
  boardName: string;
  assignee: {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
  };
}

export interface IBoard {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  description: string;
  teamId: number;
  teamName: string;
  taskCount: number;
  avatarUrl: string;
}
