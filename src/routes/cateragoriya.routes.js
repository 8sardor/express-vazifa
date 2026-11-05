import { Router } from 'express';
import caterogoriyaController from '../controller/caterogoriya.controller.js'; //[cite: 1, 2]
import { validate } from '../middleware/validate.midleware.js'; //
import { creatUserSchema, updateUserSchema} from '../validation/caterogoriya.validate.js'; //

const router_cateregoriya = Router();

router
    .get('/', caterogoriyaController.getAll)
    .get('/:id', caterogoriyaController.getId)
    .post('/', validate(creatUserSchema), caterogoriyaController.create)
    .put('/:id', validate(updateUserSchema), caterogoriyaController.update)
    .delete('/:id', caterogoriyaController.deleteItem);

export { router_cateregoriya };