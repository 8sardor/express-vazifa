import { Router } from 'express';
import {ReturnedController} from './controller/returned.controller.js'; 
import { validate } from '../middleware/validate.midleware.js'; 
import { creatUserSchema,updateUserSchema } from '../validation/returned.validate.js'; 

const router_returned = Router();


    router_returned.get('/', ReturnedController.getAll)
    router_returned.get('/:id', ReturnedController.getId)
   router_returned.post('/', validate(creatUserSchema), ReturnedController.create)
    router_returned.put('/:id', validate(updateUserSchema), ReturnedController.update)
    router_returned.delete('/:id',ReturnedController.delete);

export { router_returned }