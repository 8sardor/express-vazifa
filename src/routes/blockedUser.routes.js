import { Router } from "express";
import blockUserController from "../controller/blockedUsers.controller.js";
import { validate } from "../middleware/validate.midleware.js";
import { creatUserSchema, updateUserSchema } from "../validation/blockedUser.js";

const router_block = new Router();  


router_block
    .get('/',blockUserController.getAll)
    .get('/:id',blockUserController.getId)
    .post('/',validate(creatUserSchema),blockUserController.creat)
    .put('/:id',validate(updateUserSchema),blockUserController.update)
    .delete('/:id',blockUserController.delete)




export {router_block}