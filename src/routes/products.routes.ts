import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const productsRoutes = Router();
const productsController = new ProductsController();

// Apply verification in all routes
// productsRoutes.use(verifyUserAuthorization(["sale", "admin"]))

productsRoutes.get("/", productsController.index);
productsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "admin"]),
  productsController.create
);

export { productsRoutes };
