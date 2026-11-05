// import Joi from 'joi';

// export const createDiscountSchema = Joi.object({
//     nomi: Joi.string().min(2).max(20).required().messages({
//     'string.min':'Kamida 2 ta harfdan iborat bulsin',
//     'string.max':'Maximum 20 ta bulsin'
//     }),
//     narx: Joi.number().positive().required().messages({
//         'number.positive':'Musbat bulishi kerak'
//     }),
//     foyiz: Joi.number().min(1).max(100).required().messages({
//         'number.min':'Kamida 1 foiz bulishi kerak',
//         'number.max':'Maximum 100 bulishi kerak'
//     })
// })

// export const updateDiscountSchema = Joi.object({
//  nomi: Joi.string().min(2).max(20).required().messages({
//     'string.min':'Kamida 2 ta harfdan iborat bulsin',
//     'string.max':'Maximum 20 ta bulsin'
//     }),
//     narx: Joi.number().positive().required().messages({
//         'number.positive':'Musbat bulishi kerak'
//     }),
//     foyiz: Joi.number().min(1).max(100).required().messages({
//         'number.min':'Kamida 1 foiz bulishi kerak',
//         'number.max':'Maximum 100 bulishi kerak'
//     })
// })
// export{
//     createDiscountSchema,
//     updateDiscountSchema
// }
import Joi from 'joi';

export const createDiscountSchema = Joi.object({
    nomi: Joi.string().min(2).max(20).required().messages({
        'string.min': 'Kamida 2 ta harfdan iborat bulsin',
        'string.max': 'Maximum 20 ta bulsin',
        'any.required': 'Nomi kiritilishi shart'
    }),
    narx: Joi.number().positive().required().messages({
        'number.positive': 'Musbat bulishi kerak',
        'any.required': 'Narx kiritilishi shart'
    }),
    foyiz: Joi.number().min(1).max(100).required().messages({
        'number.min': 'Kamida 1 foiz bulishi kerak',
        'number.max': 'Maximum 100 bulishi kerak',
        'any.required': 'Foyiz kiritilishi shart'
    })
});

// Create sxemasidan foydalanib update sxemasini yaratish (barcha maydonlar ixtiyoriy bo'ladi)
export const updateDiscountSchema = createDiscountSchema.fork(
    ['nomi', 'narx', 'foyiz'], 
    (schema) => schema.optional()
).min(1).messages({
    'object.min': 'Yangilash uchun kamida bitta maydon kiritilishi kerak'
});