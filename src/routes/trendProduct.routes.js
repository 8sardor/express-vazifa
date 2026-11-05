import { Router } from 'express';
import trendProductController from '../controller/trendProduct.controller.js'; 
import { validate } from '../middleware/validate.midleware.js';
import { creatUserSchema, updateUserSchema } from '../validation/trendProduct.validate.js';

const router_trend = Router();

router
    .get('/', trendProductController.getAllProducts)
    .get('/:id', trendProductController.getProductById)
   .post('/', validate(creatUserSchema), trendProductController.createProduct)
    .put('/:id', validate(updateUserSchema), trendProductController.updateProduct)
    .delete('/:id', trendProductController.deleteProduct);

export { router_trend };