import Joi from 'joi';

export const createProductSchema = Joi.object({
    nomi: Joi.string().min(2).max(100).required(),
    kategoriya: Joi.string().min(2).max(50).required(),
    brend: Joi.string().min(2).max(50).required(),
    narx: Joi.number().positive().required(),
    soni: Joi.number().integer().min(0).default(1),
    rangi: Joi.string().min(2).max(30).optional(),
    tavsif: Joi.string().min(5).max(500).optional(),
    mavjud: Joi.boolean().default(true)
});

export const updateProductSchema = Joi.object({
    nomi: Joi.string().min(2).max(100),
    kategoriya: Joi.string().min(2).max(50),
    brend: Joi.string().min(2).max(50),
    narx: Joi.number().positive(),
    soni: Joi.number().integer().min(0),
    rangi: Joi.string().min(2).max(30),
    tavsif: Joi.string().min(5).max(500),
    mavjud: Joi.boolean()
}).min(1);