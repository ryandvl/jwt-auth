import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/app-error";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Invalid JWT Token.", 401);
  }

  const [, token] = authHeader.split(" ");

  const { sub: user_id, role } = verify(
    token,
    authConfig.jwt.secret
  ) as TokenPayload;

  request.user = {
    id: String(user_id),
    username: "??",
    password: "??",
    role,
  };

  return next();
}

export { ensureAuthenticated };
