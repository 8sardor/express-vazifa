import Joi from 'joi'
const creatUserSchema=Joi.object({
    name:Joi.string().min(3).max(20).required().messages({
        'string.min':'Minimal 3 ta harfdan iborat bulsihi kerak',
        'string.max':'Maximal 20ta harfdan iborat bulishi kerak',
        
    })
    
    
})
const updateUserSchema=Joi.object({
    name:Joi.string().min(3).max(20).required().messages({
        'string.min':'Minimal 3 ta harfdan iborat bulsihi kerak',
        'string.max':'Maximal 20ta harfdan iborat bulishi kerak'
        
    })    
})

export{
    creatUserSchema,
    updateUserSchema
}