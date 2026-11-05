import { Router } from 'express';
import newProductController from '../controller/newProduct.controller.js'; //[cite: 1, 2]
import { validate } from '../middleware/validate.midleware.js'; //[cite: 3]
import { creatUserSchema, updateUserSchema } from '../validation/newProduct.js'; //[cite: 3]

const router_newproduct = Router();

router
    .get('/', newProductController.getAllProducts)
    .get('/:id', newProductController.getProductById)
    .post('/', validate(creatUserSchema), newProductController.createProduct)
    .put('/:id', validate(updateUserSchema), newProductController.updateProduct)
    .delete('/:id', newProductController.deleteProduct);

export { router_newproduct };