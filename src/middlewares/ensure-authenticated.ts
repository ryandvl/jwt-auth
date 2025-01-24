import { AppError } from "@/utils/app-error";
import { Request, Response, NextFunction } from "express";

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

  console.log(token);

  return next();
}

export { ensureAuthenticated };
