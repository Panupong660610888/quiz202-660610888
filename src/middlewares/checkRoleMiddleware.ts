import { type Request, type Response, type NextFunction } from "express";
import { type CustomRequest, type User } from "../libs/types.js";
import { users } from "../db/db.js";

export const checkRoleMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.user;
  const token = req.token;

  // 2. check if user exists (search with username) and role is ADMIN
  const user = users.find((u: User) => u.username === payload?.username);
  if (!user || user.userId !== payload?.userId) {
    return res.status(403).json({
      success: false,
      message: "You can't access this API route",
    });
  }

  next();
};
