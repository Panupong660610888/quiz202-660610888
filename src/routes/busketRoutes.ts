import { Router, type Request, type Response } from "express";
import type { User, UserPayload, CustomRequest } from "../libs/types.ts";
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
import { users, items } from "../db/db";
//import uuid
import { v4 as uuidv4 } from "uuid";

import { authenticateToken } from "../middlewares/authenMiddleware.js";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware.js";
import { success } from "zod";

const router = Router();
router.get("/", authenticateToken, (req: CustomRequest, res: Response) => {
  try {
    const user = req.user as UserPayload;
    const result = zUserId.safeParse(user.userId);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message,
      });
    }

    const infoBusket = items.filter((item) => item.userId === user.userId);

    if (!infoBusket) {
      return res.status(404).json({
        success: false,
        message: `items for user ID ${user.userId} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      data: infoBusket,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again.",
      error: err,
    });
  }
});

router.delete(
  "/",
  authenticateToken,
  checkRoleMiddleware,
  (req: CustomRequest, res: Response) => {
    try {
      const user = req.user;
      const body = req.body;
      const result = zItemId.safeParse(body.itemId);
      if (!result.success) {
        return res.status(400).json({
          ok: false,
          message: result.error.issues[0]?.message,
        });
      }

      const user_id = user?.userId;
      const item_id = result.data;

      const foundIndex = items.findIndex(
        (erm) => erm.userId === user_id && erm.itemId === item_id,
      );

      if (foundIndex === -1) {
        return res.status(404).json({
          success: false,
          message: `There are no items with item ID ${item_id} for user ID ${user_id}`,
        });
      }

      items.splice(foundIndex, 1);

      return res.status(200).json({
        ok: true,
        message: `Item ID ${item_id} has been removed from the basket.`,
        data: items.filter((item) => item.userId === user_id),
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
        message: "Something is wrong, please try again.",
        error: err,
      });
    }
  },
);

export default router;
