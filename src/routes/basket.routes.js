import { Router } from "express";
import basketController from "../controller/basket.controller.js";
import { validate } from "../middleware/validate.midleware.js"; // Imlo to'g'irlandi
import { creatUserSchema, updateUserSchema } from "../validation/basket.validate.js"; // Imlo to'g'irlandi

const router_basket = Router();

router
    .get("/", basketController.getAll)
    .get("/:id", basketController.getId)
    .post("/", validate(creatUserSchema), basketController.create)
    .patch("/:id", validate(updateUserSchema), basketController.update) // PUT o'rniga PATCH tavsiya etiladi
    .delete("/:id", basketController.delete);

export { router_basket };