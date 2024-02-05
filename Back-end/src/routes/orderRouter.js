import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
import {
  createOrder,
  getOrders,
  updateStatus,
} from "../controllers/orderController.js";

export const orderRouter = new Router();

orderRouter.get("/", authenticate, isAdmin, getOrders);
orderRouter.get("/update", authenticate, isAdmin, updateStatus);
orderRouter.get("/create", authenticate, createOrder);
