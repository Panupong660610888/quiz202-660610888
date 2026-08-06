import { Router, type Request, type Response } from "express";
// import Zod validators
import {
  zUserId,
  zItemId,
  zItemPostBody,
  zItemPutBody,
  zItemDeleteBody,
} from "../libs/zodValidators.js";
// import types
import type { Item } from "../libs/types.ts";
// import database
import { users } from "../db/db";
//import uuid
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
  });
});

export default router;
