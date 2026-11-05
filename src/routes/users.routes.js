import {Router} from 'express'
import UserController from '../controller/users.controller.js';
import usersController from "../controller/users.controller.js";
import { creatUserSchema, updateUserSchema } from '../validation/user.validate.js';

const router_users = new Router()



    router_users.get('/', UserController.getAll)
    router_users.get('/:id', usersController.getId)
    router_users.post('/', validate(creatUserSchema), usersController.create)          // Fixed 'creat' -> 'create' and 'creatUserSchema'
    router_users.put('/:id', validate(updateUserSchema), usersController.update)  
    router_users.delete('/', usersController.deleteuser)





export {
    router_users
};