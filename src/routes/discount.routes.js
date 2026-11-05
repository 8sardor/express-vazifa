import { Router } from 'express';
import discountController from '../controller/discount.controller.js'
import { validate } from '../middleware/validate.midleware.js'
import { createDiscountSchema, updateDiscountSchema } from '../validation/discount.validate.js'

const router_discount = Router();


router.get('/', discountController.getAll)
    router.get('/:id', discountController.getId)
    router.post('/', validate(createDiscountSchema), discountController.create)
    router.put('/:id', validate(updateDiscountSchema), discountController.update)
    router.delete('/:id', discountController.deleteItem);

export { router_discount}