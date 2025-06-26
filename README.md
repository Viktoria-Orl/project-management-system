# Project Management Systems


**Unit Tested | Dockerized | Vite + React + Redux + Ant Design**

A **mini project management system** that allows managing tasks across multiple boards, viewing detailed information about each issue, and changing their status using a drag-and-drop interface. Built with **React**, **Redux Toolkit**, **Ant Design**, and **Vite**, the app runs entirely in Docker and includes comprehensive unit testing.

---

## Features

### Task Management

- View all tasks across all boards (`/issues`)
- View list of all boards (`/boards`)
- View specific board with grouped tasks by status (`/board/:id`)
- Open task details in a modal to:
  - View full info
  - Edit task details
- Create new tasks via modal
- Switch task status using **Drag-and-Drop**
- Task editing accessible from:
  - All tasks page
  - Board page
- From task modal, navigate directly to its board with the same task opened
- Form autosave: form data is saved to localStorage as a draft
- Header navigation:
  - Boards
  - All Issues
  - Create New Task button

---

## Technologies Used

- **React** — declarative UI framework
- **Vite** — fast development and build tool
- **TypeScript** — typed JavaScript for safety
- **Ant Design** — modern UI components
- **Redux Toolkit** — powerful and concise state management
- **RTK Query** (`@reduxjs/toolkit/query/react`) — efficient data fetching & caching
- **React Router** — SPA routing (`/issues`, `/boards`, `/board/:id`)
- **dnd-kit** — accessible and flexible drag-and-drop library
- **ESLint + Prettier** — code quality and formatting
- **Jest + MSW** — unit testing and API mocking
- **Docker** — containerized app environment

---

## Getting Started


### Prerequisites

- [Docker](https://www.docker.com/)
- Docker Compose

### Run the project

1. Clone the repository:

```bash
git clone https://github.com/https://github.com/Viktoria-Orl/project-management-system.git
```
```bash
cd project-management-system
```

2. Build the containers:

```bash
docker-compose build
```

3. Start the services:

```bash
docker-compose up
```

This will start both the client and the server using Docker Compose.

The frontend will be available at: http://localhost:5173

The backend API (a ready-to-use REST API located in the server/ directory) will run at: http://localhost:8080