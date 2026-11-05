import Joi from 'joi'
const creatUserSchema=Joi.object({
    name:Joi.string().min(3).max(20).required().messages({
        'string.min':'Minimal 3 ta harfdan iborat bulsihi kerak',
        'string.max':'Maximal 20ta harfdan iborat bulishi kerak',
        
    }),
    narx:Joi.number().min(1).positive().required().messages({
        'number.min':'Minimal 1 bulishi kerak',
        'number.positive':'Manfiy bulishi mumkin emas'
    })
    
})
const updateUserSchema=Joi.object({
    name:Joi.string().min(3).max(20).required().messages({
        'string.min':'Minimal 3 ta harfdan iborat bulsihi kerak',
        'string.max':'Maximal 20ta harfdan iborat bulishi kerak',
        
    }),
    narx:Joi.number().min(1).positive().required().messages({
        'number.min':'Minimal 1 bulishi kerak',
        'number.positive':'Manfiy bulishi mumkin emas'
    })
})
export{
    updateUserSchema,
    creatUserSchema
}