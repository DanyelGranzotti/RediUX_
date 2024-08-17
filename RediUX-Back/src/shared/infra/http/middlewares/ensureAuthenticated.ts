import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UserRepository } from "../../../../modules/users/repository/UserRepository";
import { AppError } from "../../../erros/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_email } = verify(
      token,
      "6c42b2e01bafd16f1ac50e358a679f6d",
    ) as IPayload;

    const userRepository = container.resolve(UserRepository);
    const user = userRepository.findByEmail(user_email);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
