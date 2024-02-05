import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../middleware/multer.js";

export const productRouter = new Router();

productRouter.get("/", getAllProducts);
productRouter.get("/one", getOneProduct);
productRouter.delete("/delete", authenticate, isAdmin, deleteProduct);
productRouter.patch(
  "/update",
  upload.single("image"),
  authenticate,
  isAdmin,
  updateProduct
);
productRouter.post(
  "/create",
  upload.single("image"),
  authenticate,
  isAdmin,
  createProduct
);
