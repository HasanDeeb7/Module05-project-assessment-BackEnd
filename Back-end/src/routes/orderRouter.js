import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
import {
  createOrder,
  getOrders,
  updateStatus,
} from "../controllers/orderController.js";

export const orderRouter = new Router();

orderRouter.get("/", authenticate, isAdmin, getOrders);
orderRouter.patch("/update", authenticate, isAdmin, updateStatus);
orderRouter.post("/create", authenticate, createOrder);
