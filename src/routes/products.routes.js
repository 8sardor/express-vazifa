import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import {validate} from "../middleware/validate.midleware.js"
import { createProductSchema, updateProductSchema } from "../validation/product.validate.js";

const router_products= Router();

router.get("/", ProductsController.getAllProduct);
router.get("/:id", ProductsController.getProductById);
router.post("/", validate(createProductSchema), ProductsController.createProduct);
router.put("/:id", validate(updateProductSchema), ProductsController.updateProduct);
router.delete("/:id", ProductsController.deleteProduct);

export default router_products;