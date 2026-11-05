 import { getData,setData } from "../helpers/filedata.js"

const fileName="users.json"
class UserController {
     
 async  getAll(req,res,){
     try {
        const users = await getData(fileName)
        if (!users) {
            return res.status(400).json({
                succes: false,
                message: 'Not found users'
            })
        }
        return res.status(200).json({
            succes: true,
            data: users
        }) 
    }
    catch (err) {
        res.status(500).json({
            succes: false,
            data: `Server Error:${err.message}`
        })
    }
}
////////GET
    async getId(req,res){
       try{
        const id=  +req.params.id
        const users = await getData()
        const user = users.find(el=>el.id===id)

        if(!user){
            res.status(404).json({
                succes:false,
                message:`Error:${err.message}`
            })
        }
        res.status(200).json({
            success:true,
            message:'malumot topildi',
            data:user
        })

       }catch(err){
        res.status(400).json({
            succes:false,
            message:`Error : ${err.message}`
        })
       }
        
    }
////////POST
    async create(req, res) { // Changed 'creat' to 'create' to match standard naming
    try {
        const users = await getData(fileName);
        
        const newUser = {
            id: users.length ? users.at(-1).id + 1 : 1,
            ...req.body
        };
        
        users.push(newUser);
        await setData(users); // If your setData needs the filename, make sure it's setData(fileName, users)
        
        // Removed res.writeHead(201) because res.status(201) handles it safely
        return res.status(201).json({
            success: true, // Fixed spelling from 'succes'
            message: "Yangi user qo'shildi",
            user: newUser
        });
    } 
    catch (err) {
        return res.status(500).json({ // Changed 404 to 500 for server/catch errors
            success: false, // Fixed spelling from 'succes'
            message: `Error: ${err.message}`
        });
    }
}
    //////PUT
    async update(req,res){
        const id=+req.params.id
        const users=await getData(fileName)
        const index=users.findIndex(el=>el.id===id)
        if(index!=-1){
            users[index]={
                id:id,
                ...req.body
            }
            await setData(users)
            return res.status(201).json({
                succes:true,
                message:`Muvofaqiyatli o'zgartirildi`
                
            })
           
        }
         return res.status(404).json({
                succes:false,
                message:`Not found id:${id}`
                
            })
    }
 //////DELETE
    async deleteuser(req,res){
     const id=+req.params.id
        const users=await getData(fileName)
        const index=users.findIndex(el=>el.id===id)
       if(index===-1){
        res.status(400).json({
            succes:false,
            message:`User topilmadi`
        })
       }
        users.splice(index,1)
        await setData(users)
        return res.status(200).json({
            succes:true,
            message:`User o'chirildi`
        })   
    }
}



export default new UserController()