import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", ensureAuthenticated, productsController.create);

export { productsRoutes };
