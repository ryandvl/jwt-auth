import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/app-error";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const fakeUser = {
      id: 1,
      username: "ryan",
      password: "123456",
    };

    if (username !== fakeUser.username || password !== fakeUser.password) {
      throw new AppError("Username or password invalid.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      expiresIn,
      subject: String(fakeUser.id),
    });

    return response.json({ token });
  }
}

export { SessionsController };
