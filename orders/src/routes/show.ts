import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@amoctagoninfotech/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/:orderId", requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findOne({
    id: req.params.orderId,
    userId: req.currentUser?.id,
  }).populate("ticket");

  if (!order) {
    throw new NotFoundError();
  }

  res.send(order);
});

export { router as showOrderRouter };
