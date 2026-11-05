import Joi from "joi";

const creatUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.min': 'Foydalanuvchi ismi kamida 3 ta harf bo`lishi kerak',
        'string.max': 'Foydalanuvchi ismi maksimal 20 ta bo`lishi kerak',
        'string.empty': 'Foydalanuvchi ismini kiriting',
        'any.required': 'Foydalanuvchi ism kiritishi shart'
    }),
    email: Joi.string().email().trim().min(3).max(20).required().messages({
        'string.email': 'Yaroqli email kiriting',
        'string.min': 'Email kamida 3 ta harf bo`lishi kerak',
        'string.max': 'Email maksimal 20 ta bo`lishi kerak',
        'string.empty': 'Email bo`sh bo`lishi mumkin emas',
        'any.required': 'Foydalanuvchi email kiritishi shart'
    })
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.min': 'Foydalanuvchi ismi kamida 3 ta harf bo`lishi kerak',
        'string.max': 'Foydalanuvchi ismi maksimal 20 ta bo`lishi kerak',
        'string.empty': 'Foydalanuvchi ismini kiriting',
        'any.required': 'Foydalanuvchi ism kiritishi shart'
    }),
    email: Joi.string().email().trim().min(3).max(20).required().messages({
        'string.email': 'Yaroqli email kiriting',
        'string.min': 'Email kamida 3 ta harf bo`lishi kerak',
        'string.max': 'Email maksimal 20 ta bo`lishi kerak',
        'string.empty': 'Email bo`sh bo`lishi mumkin emas',
        'any.required': 'Foydalanuvchi email kiritishi shart'
    })
});

export {
    creatUserSchema,
    updateUserSchema
};