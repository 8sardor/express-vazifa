import Joi from 'joi';

// 1. Yangi qo'shish uchun schema (POST)
const creatUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.min': 'Minimal 3 ta harfdan iborat bo\'lishi kerak',
        'string.max': 'Maximal 20 ta harfdan iborat bo\'lishi kerak',
        'any.required': 'Ism kiritilishi shart'
    }),
    narx: Joi.number().min(1).positive().required().messages({
        'number.base': 'Narx raqam bo\'lishi kerak',
        'number.min': 'Minimal 1 bo\'lishi kerak',
        'number.positive': 'Manfiy bo\'lishi mumkin emas',
        'any.required': 'Narx kiritilishi shart'
    })
});

// 2. Tahrirlash uchun schema (PUT) - ixtiyoriy va kamida 1 ta maydon kiritilishi shart
const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    narx: Joi.number().min(1).positive().optional()
}).min(1).messages({
    'object.min': 'Tahrirlash uchun kamida bitta maydon kiritilishi kerak'
});

export { creatUserSchema, updateUserSchema };