 const validate=(schema,source='body')=>(req,res,next)=>{
    const {error,value}=schema.validate(req(source),{
    })
        if(err){
            return res.status(400).json({
                success:false,
                message:`Validation xatosi`,
                error:error.details.map((el)=>el.message)
            })
        }
        if(source==='body') req.body=value
        next()
    }
 export {
    validate
 }