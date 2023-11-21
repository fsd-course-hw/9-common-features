import { HttpResponse, delay, http } from "msw";
import { usersRepository } from "./users.repository";
import {
  BoardPatchDto,
  CreateBoardDto,
  CreateTaskDto,
  CreateUserDto,
  SignInDto,
  UpdateTaskDto,
} from "../generated";
import { sessionRepository } from "./session.repository";
import { tasksRepository } from "./tasks.repository";
import { boardsRepository } from "./boards.repository";

const needAuthorization = async () => {
  return new HttpResponse(null, {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const unauthorized = async () => {
  return new HttpResponse(null, {
    status: 403,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const ok = async (body?: unknown) => {
  return new HttpResponse(body ? JSON.stringify(body) : null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getHandlers = async () => {
  const users = await usersRepository.getUsers();
  if (users.length === 0) {
    await usersRepository.addUser({
      name: "Администрюк",
      email: "admin@gmail.com",
      password: "admin",
      role: "admin",
      avatarId: "1",
    });
  }

  return [
    http.get("/api/users", async () => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const users = await usersRepository.getUsers();

      return ok(users);
    }),

    http.post("/api/users", async ({ request }) => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      if (sesson.role !== "admin") {
        return unauthorized();
      }

      const body = await request.json();

      const newUser = await usersRepository.addUser(body as CreateUserDto);

      await delay(1000);
      return ok(newUser);
    }),

    http.delete("/api/users/:userId", async ({ params }) => {
      const userId = params.userId as string;

      await usersRepository.removeUser(userId);

      await delay(1000);

      return ok();
    }),

    http.get("/api/session/me", async () => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      return ok(sesson);
    }),

    http.post("/api/session/sign-in", async ({ request }) => {
      const body = await request.json();

      const res = await sessionRepository.signIn(body as SignInDto);

      if (!res) return needAuthorization();

      await delay(1000);
      return ok(res);
    }),

    http.post("/api/session/sign-out", async () => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      await sessionRepository.signOut();

      return ok();
    }),

    http.get("/api/tasks", async () => {
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const tasks = await tasksRepository.getTasks();

      return ok(tasks);
    }),

    http.post("/api/tasks", async ({ request }) => {
      const body = await request.json();
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const task = await tasksRepository.createTask(body as CreateTaskDto);

      return ok(task);
    }),

    http.get("/api/tasks/:taskId", async ({ params }) => {
      const taskId = params.taskId as string;

      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      return ok(await tasksRepository.getTask(taskId));
    }),

    http.patch("/api/tasks/:taskId", async ({ request, params }) => {
      const body = await request.json();
      const taskId = params.taskId as string;
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const task = await tasksRepository.updateTask(
        taskId,
        body as UpdateTaskDto,
      );

      return ok(task);
    }),
    http.delete("/api/tasks/:taskId", async () => {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }),

    http.post("/api/boards", async ({ request }) => {
      const body = await request.json();

      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const board = await boardsRepository.createBoard(body as CreateBoardDto);

      return ok(board);
    }),

    http.get("/api/boards", async () => {
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const boards = await boardsRepository.getBoards();

      const boardsToShow = boards.filter(
        (board) =>
          board.ownerId === sesson.userId ||
          board.editorsIds.includes(sesson.userId),
      );

      return ok(boardsToShow);
    }),

    http.get("/api/boards/:boardId", async ({ params }) => {
      const boardId = params.boardId as string;

      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const board = await boardsRepository.getBoard(boardId);

      if (!board) {
        return new HttpResponse(null, {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      if (
        board.ownerId !== sesson.userId &&
        !board.editorsIds.includes(sesson.userId)
      ) {
        return unauthorized();
      }

      return ok(board);
    }),

    http.patch("/api/boards/:boardId", async ({ params, request }) => {
      const body = await request.json();
      const boardId = params.boardId as string;

      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const board = await boardsRepository.getBoard(boardId);

      if (
        !board ||
        (board.ownerId !== sesson.userId &&
          !board.editorsIds.includes(sesson.userId))
      ) {
        return new HttpResponse(null, {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await boardsRepository.updateBoard(boardId, body as BoardPatchDto);

      return ok(board);
    }),
    http.delete("/api/boards/:boardId", async ({ params }) => {
      const boardId = params.boardId as string;

      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const board = await boardsRepository.getBoard(boardId);

      if (!board || !(board.ownerId === sesson.userId)) {
        return new HttpResponse(null, {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await boardsRepository.removeBoard(boardId);

      return ok(board);
    }),
  ];
};
